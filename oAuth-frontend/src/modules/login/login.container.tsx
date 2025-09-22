import environments from "@/common/environments";
import Login from "@/components/login/login-form"
import AuthService from "@/services/auth.service"
import { useMemo } from "react"

const LoginContainer = () => {
    const authService = useMemo(() => new AuthService(), []);

    const onGoogleClick = async () => {
        const redirectUri = new URL(environments.REDIRECT_URI);
        try {
            const redirectUrl = `https://accounts.google.com/o/oauth2/auth?scope=openid profile email&response_type=code&access_type=offline&state=${"state"}&redirect_uri=${redirectUri}&client_id=${environments.GOOGLE_AUTH_CLIENT_ID}`;
            window.location.assign(redirectUrl)
            // const response = await authService.GoogleLogin();

        } catch (err) {
            console.log(err)
        }
    }

    const onFacebookClick = () => {

    }
    const onGithubClick = () => {

    }
    return <Login
        onGoogleClick={onGoogleClick}
        onFacebookClick={onFacebookClick}
        onGithubClick={onGithubClick}
    />;
}

export default LoginContainer;