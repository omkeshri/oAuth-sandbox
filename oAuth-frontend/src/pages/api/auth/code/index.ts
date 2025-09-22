import AuthService from "@/services/auth.service";
import { setCookie } from "cookies-next";

const ExchangeCode = async (req: any, res: any) => {
  const { code } = req.query;
  try {
    const authService = new AuthService();
    const response = await authService.GoogleLogin({ code });
    const { sessionToken, expiresIn } = response;

    setCookie("session", sessionToken, {
      req,
      res,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.redirect("http://localhost:3000/auth/login");
  } catch (err) {
    console.log(err);
  }
};

export default ExchangeCode;
