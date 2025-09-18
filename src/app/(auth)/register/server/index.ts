"use server"

import SaveFileToPublicDir from "@/app/functions/SaveFile";
import prisma from "@/services/prisma"
import GrantSession from "@/services/session";

export default async function RegisterServerAction(formData: FormData) {
    const data = Object.fromEntries(formData)
    const name = data.name as string;
    const username = data.username as string;
    const password = data.password as string;
    const profileData = data.profile;
    let success = true;
    try {

        let profile = ""
        console.log(`profile is ********************************************`)
        console.log(`profile is ********************************************`)
        console.log(profile)
        if (profileData) {
            profile = await SaveFileToPublicDir(profileData as File, "profiles") || "";
        }

        const user = await prisma.user.create({
            data: {
                name, password, profile, username
            }
        })
        await GrantSession(user.username);
    } catch {
        success = false
    }
    return {
        success,message:"the username already exist"
    }
}