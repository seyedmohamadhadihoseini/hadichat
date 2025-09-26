import RegisterNewUserComponent from "@/components/auth/register";
import RegisterServerAction from "./server";

export default function RegisterDispaly()
{
    return (
        <RegisterNewUserComponent RegisterServerAction={RegisterServerAction}/>
    );
}