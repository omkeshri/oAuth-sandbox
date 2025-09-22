import AuthService from "@/services/auth.service";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const authService = new AuthService();

    try {
        const response = await authService.VerifySession(ctx);
        return {
            props: {
                verified: true
            }
        }
    }
    catch {
        return {
            props: {
                verified: false
            }
        }
    }

}

const HomePage = (props: any) => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            You are successfully Logged in!
        </div>
    )
}

export default HomePage;