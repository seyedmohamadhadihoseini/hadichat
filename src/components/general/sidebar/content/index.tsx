"use client"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
import { useWebSocket } from "@/lib/websocket/context";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FindProfile, FindTitle } from "./server";
import { useUserData } from "@/hooks/use-userData";
import { usePathname, useRouter } from "next/navigation";
import { changeChat } from "@/lib/redux/slices/chatSlice";
export default function ContentSidebarComponent() {
    const { data } = useWebSocket()
    const [chatsDisplay, setChatsDisplay] = useState<React.ReactNode[]>();
    const pathname = usePathname();
    const chatId = pathname.substring(pathname.lastIndexOf("/")+1);
    const { user } = useUserData()
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        const func = async () => {
            const chatList = (data.chats?.map(async (chat) => {
                return <SidebarMenuItem key={chat.id} className={`${style.itembar} ${chatId == chat.id ? style.active : ""}`}>
                    <SidebarMenuButton asChild>
                        <button onClick={() => {
                            router.push(`/chat/${chat.id}`)
                        }}>
                            <Image alt={chat.title || ""} src={`${process.env.NEXT_PUBLIC_HOST}/api/profile?name=${await FindProfile(chat.id, user.username)}`} width={30} height={100} />
                            <span>{await FindTitle(chat.id, user.username)}</span>
                        </button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            }))
            setChatsDisplay(chatList);
        }
        func()

    }, [data, chatId, dispatch, user, router])

    return (
        <SidebarContent>
            <SidebarGroup >
                <SidebarGroupLabel>chats</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {chatsDisplay}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
    );
}
