import AuthService from "@/services/auth.service";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const authService = new AuthService();

    try {
        const response = await authService.VerifySession(ctx);
        if (response?.status === 200) {
            return {
                props: {
                    verified: "successfully"
                }
            }
        }
        throw new Error;
    }
    catch{
        return {
            props: {
                verified: "not successfully"
            }
        }
    }

}

const HomePage = (props: any) => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            You are {props.verified} Logged in!
        </div>
    )
}

export default HomePage;