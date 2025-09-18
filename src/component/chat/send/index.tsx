"use client"
import { useState } from "react";
import style from "./style.module.css"
import { useWebSocket } from "@/lib/websocket/context";
import { AddNewMessages } from "@/lib/websocket/actions";
import { useUserData } from "@/hooks/use-userData";
import { useChatData } from "@/hooks/use-chatData";
import { Message } from "@prisma/client";


export default function SendMessageComponent({ storeMessage }: { storeMessage: (formData: FormData) => Promise<Message> }) {
    const [text, setText] = useState("");
    const { socket } = useWebSocket();
    const { user } = useUserData();
    const { chat } = useChatData();
    if (!socket) {
        return <div></div>
    }
    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            if (text.length > 0) {
                const data = new FormData()
                data.append("text", text);
                data.append("chat-id", chat.id);
                data.append("sender-id", user.username);
                const newMessage = await storeMessage(data)
                AddNewMessages(socket, user, [newMessage], chat.id);
                setText("");
            }
        }} className={style.container}>
            <input type="text" name="text" value={text} onChange={e => setText(e.target.value)} />
            <button type="submit">send</button>
        </form>
    );
}