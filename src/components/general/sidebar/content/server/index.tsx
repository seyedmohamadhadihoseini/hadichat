"use server"

import prisma from "@/services/prisma"

export async function FindProfile(chatId: string, username: string) {
    let result :string|null= null;
    const chat = await prisma.chat.findUnique({
        where: { id: chatId }, include: {
            Users: true
        }
    });
    
    if (!chat) {
        result = null;
        return result;
    }
    if (chat?.profile) {
        result =  chat.profile;
        

    } else {
        const users = chat.Users.filter(user => user.username != username && user.profile);
        if (users.length > 0) {
            result = users[0].profile;
        }else{
            result = null;
        }
    }
    return result;
}
export async function FindTitle(chatId: string, username: string) {
    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId
        }, include: {
            Users: true
        }
    })
    if (!chat) {
        return "chat";
    }
    if (chat.title.length > 0) {
        return chat.title;
    } else {
        const users = chat.Users.filter(user => user.username != username);
        if (users.length > 0) {
            return users[0].name
        }
    }
    return null;
}