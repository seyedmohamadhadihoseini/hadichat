import HistoryChatApp from "./history";
import ProfileChatApp from "./profile";
import SendMessageApp from "./send";
import style from "./style.module.css";
import { ChatDataProvider } from "@/hooks/use-chatData";
import prisma from "@/services/prisma";
export default async function ChatApp({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const chat = await prisma.chat.findUnique({ where: { id } });
    if (!chat) {
        return <div></div>
    }
    return <ChatDataProvider chat={chat}>
        <div className={style.container}>
            <ProfileChatApp />
            <HistoryChatApp />
            <SendMessageApp />
        </div>
    </ChatDataProvider>
}