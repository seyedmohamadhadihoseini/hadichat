
"use server";
import prisma from "@/services/prisma";
import GrantSession from "@/services/session";
import { Validate } from "./validate";

export default async function LoginServerAction(formData: FormData) {
    let success = false;
    const data = Object.fromEntries(formData)
    const inputUsername = data.username.toString();
    const password = data.password.toString();
    const isRemember = data["remember-me"] ? true : false;

    const user = await prisma.user.findFirst({
        where: {
            username: inputUsername
        }
    });

    if (user && user.password.toString() == password && Validate(user.username, user.password)) {
        await GrantSession(user.username);
        success = true;
    }
    return {success,message:"successfully login"};
}