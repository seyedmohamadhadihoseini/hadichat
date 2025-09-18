"use server"

import prisma from "@/services/prisma"
import { SkipForward } from "lucide-react";

export default async function GetUser(username:string) {
    const user =  await prisma.user.findUnique({
        where:{username}
    })
    return user;
}

export async function GetChatUsers(chatId:string) {
    
    return (await prisma.user.findMany({
        where:{
            Chats:{some:{id:chatId}}
        }
    })).map(user=>{
        user.password = ""
        return user
    })
}
