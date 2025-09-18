"use client"



import HistoryChatComponent from "@/component/chat/history";
import { useChatData } from "@/hooks/use-chatData";
import { useUserData } from "@/hooks/use-userData";

import { useWebSocket } from "@/lib/websocket/context";
import { Message, User } from "@prisma/client";
import { useEffect, useState } from "react";

import GetUser from "./server";


export default function HistoryChatApp() {
    const { data } = useWebSocket();
    const { chat } = useChatData()
    const { user } = useUserData();
    const [messages, setMessages] = useState<(Message & { sender: User | null })[]>([]);
    
    useEffect(() => {
        const func = async () => {
            
            setMessages(await Promise.all(data.messages.filter(message => message.chatId == chat.id)
                .map(async (message) => {
                    return { ...message, sender: await GetUser(message.senderId) }
                })));
        }
        func()
    }, [data.messages,chat.id])
    return (
        <HistoryChatComponent username={user.username} messages={messages} />
    );
}