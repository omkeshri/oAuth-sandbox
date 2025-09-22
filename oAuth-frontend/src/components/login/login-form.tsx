import { Facebook, FacebookIcon, Github, GithubIcon } from "lucide-react";
import CustomButton from "../Button";

const Login = ({ onGoogleClick, onFacebookClick, onGithubClick }: any) => {
    return (
        <div className="h-screen flex justify-center items-center gap-4">
            <CustomButton
                onClick={onGoogleClick}
                label={"Google"}
            />
            <CustomButton
                onClick={onFacebookClick}
                label={"Facebook"}
                icon={<FacebookIcon />}
            />
            <CustomButton 
                onClick={onGithubClick}
                label={"Github"}
                icon={<GithubIcon />}
            />
        </div>
    )
}

export default Login;   