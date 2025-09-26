
import { Message, User } from "@prisma/client";
import HistoryItemComponent from "./item";
import style from "./style.module.css";
import { useEffect } from "react";
export default function HistoryChatComponent({ messages, username }: { username: string, messages: (Message & { sender: User | null })[] }) {
    
    const displayMessages = messages.map((message, index) =>
        <HistoryItemComponent message={message} key={Math.random()}
            isLastMessage={index == (messages.length - 1)} showProfile={index+1 < messages.length?(messages[index+1].senderId == message.senderId?false:true):true}
            username={username} profile={message.sender?.profile || "null"} />)
    useEffect(() => {
        
    }, [messages])

    return (
        <div className={style.container}>
            <ul>
                {displayMessages}
            </ul>
        </div>
    );
}