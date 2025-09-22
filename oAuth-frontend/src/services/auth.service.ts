import { api, apiServer } from "./network/axiosInterceptor";

class AuthService {
  async GoogleLogin(payload: any) {
    try {
      const { code } = payload;
      const response = await api.post("/auth/google", {
        code: code,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async VerifySession(ctx: any) {
    const server = apiServer(ctx);
    try {
      const response = await server.get("/auth/verify-token");
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default AuthService;
