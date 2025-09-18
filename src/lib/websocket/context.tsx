// app/lib/WebSocketContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Chat, Message, User } from "@prisma/client"

interface WebSocketData {
    messages: Message[];
    chats: Chat[];
}
interface WebSocketContextType {
    data: WebSocketData;
    socket: Socket | null;
}
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
export function WebSocketProvider({ children, user }: { children: React.ReactNode, user: User }) {

    const [data, setData] = useState<WebSocketData>({
        messages: [], chats: []
    });
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        // اتصال به WebSocket با namespace /trading
        const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER, {
            reconnection: true,
            reconnectionDelayMax: 10000,
        });
        setSocket(socketInstance)
        socketInstance.on('connect', () => {
            console.log('Connected to WebSocket server');
            // درخواست داده‌های اولیه
            socketInstance.emit(`subscribe-chats`, user.username, user.password);
            socketInstance.emit(`subscribe-messages`, user.username, user.password);
        });
        // گوش دادن به eventهای logs
        socketInstance.on(`new-messages-${user.username}-${user.password}`, (newMessages: Message[]) => {
            setData((prev) => ({ ...prev, messages: prev.messages.concat(newMessages) }));
        });
        // گوش دادن به eventهای server-status
        socketInstance.on(`new-chats-${user.username}-${user.password}`, (newChats: Chat[]) => {
            setData((prev) => ({ ...prev, chats: prev.chats.concat(newChats)}));
        });
        // cleanup موقع unmount
        return () => {
            socketInstance.disconnect();
            setSocket(null);
            console.log('Disconnected from WebSocket');
        };

    }, [user]);
    return (
        <WebSocketContext.Provider value={{ data, socket }}>
            {children}
        </WebSocketContext.Provider>
    );

}




// هوک برای دسترسی به Context

export function useWebSocket() {

    const context = useContext(WebSocketContext);
    if (!context) {

        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
}