"use client"


import { Chat, Message, User } from "@prisma/client"
import { Socket } from "socket.io-client"

export function AddNewChat(socket: Socket|null, currentUser: User, chat: Chat, usernames: string[]) {
    socket?.emit("new-chat", currentUser.username, currentUser.password, chat, usernames);
}
export function AddNewMessages(socket: Socket|null, currentUser: User,messages:Message[], chatId: string) {
    socket?.emit("new-messages", currentUser.username, currentUser.password,messages,chatId);
}