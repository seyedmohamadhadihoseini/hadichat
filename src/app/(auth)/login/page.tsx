import LoginUserComponent from "@/components/auth/login";
import LoginServerAction from "./server/loginCheck";




export default function LoginDisplay() {
    
    return <LoginUserComponent LoginServerAction={LoginServerAction}/>
}