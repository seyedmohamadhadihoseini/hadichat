// app/lib/ChatDataContext.tsx
'use client';
import { createContext, useContext } from 'react';

import { Chat } from "@prisma/client"

interface ChatDataContextType {
    chat: Chat;
}
const ChatDataContext = createContext<ChatDataContextType | undefined>(undefined);
export function ChatDataProvider({ children, chat }: { children: React.ReactNode, chat: Chat }) {
    return (
        <ChatDataContext.Provider value={{ chat }}>
            {children}
        </ChatDataContext.Provider>
    );
}




// هوک برای دسترسی به Context

export function useChatData() {

    const context = useContext(ChatDataContext);
    if (!context) {

        throw new Error('useWebSocket must be used within a ChatDataProvider');
    }
    return context;
}