import RegisterNewUserComponent from "@/component/auth/register";
import RegisterServerAction from "./server";

export default function RegisterDispaly()
{
    return (
        <RegisterNewUserComponent RegisterServerAction={RegisterServerAction}/>
    );
}