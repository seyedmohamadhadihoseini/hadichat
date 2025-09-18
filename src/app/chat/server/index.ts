"use server"

import SaveFileToPublicDir from "@/app/functions/SaveFile";
import prisma from "@/services/prisma";

export async function AddUserChatAction(formData: FormData) {

    const usernames = formData.getAll("username") as string[];
    const title = formData.get("title");
    const profileData = formData.get("profile");
    let profile = "";
    if (profileData) {
        profile = await SaveFileToPublicDir(profileData as File, "profiles") || profile;
    }
    const users = await prisma.user.findMany({
        where: {
            username: {
                in: usernames
            }
        }
    })
    if (users.filter(user => user).length != usernames.length) {
        return null
    }

    const combinedNames = users.reduce((acc, curr) => acc + curr.name, "")
    const chat = await prisma.chat.create({
        data: {
            title: title ? title as string : "",
            Users: {
                connect: usernames.map(username => ({ username }))
            },
            profile
        }
    })

    return chat
}
export async function CheckIfUsernameIsExist(username: string) {
    const user = await prisma.user.findUnique({ where: { username } })
    return user ? true : false;
}