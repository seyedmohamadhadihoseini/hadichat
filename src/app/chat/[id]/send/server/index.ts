"use server"

import prisma from "@/services/prisma";

export default async function storeMessage(formData: FormData) {
    const text = formData.get("text") as string;
    const chatId = formData.get("chat-id") as string;
    const senderId = formData.get("sender-id") as string;
    const newMessage = await prisma.message.create({
        data: {
            text, senderId: senderId, chatId: chatId
        }
    });
    return newMessage;
}