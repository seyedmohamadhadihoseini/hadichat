import { Message } from "@prisma/client";
import style from "./style.module.css"
import Image from "next/image";
import { useEffect, useRef } from "react";





export default function HistoryItemComponent({ message, username, profile,showProfile, isLastMessage }: { message: Message, username: string, profile: string, isLastMessage: boolean ,showProfile:boolean}) {
    const ref = useRef<HTMLLIElement>(null);
    useEffect(() => {
        if (isLastMessage) {
            ref.current?.scrollIntoView();
        }
    }, [message,isLastMessage])
    const isMessageForMe = message.senderId == username;

    return (
        <li ref={ref} className={`${style.main} ${isMessageForMe&&style.me}`}>
            <div className={style.profile}>
               {showProfile&&<Image alt={username} src={`${process.env.NEXT_PUBLIC_HOST}/api/profile?name=${profile}`} width={50} height={50} />}
            </div>
            <div className={style.text}>
                {message.text}
            </div>
        </li>
    );
}