// app/lib/UserDataContext.tsx
'use client';
import { createContext, useContext } from 'react';

import { User } from "@prisma/client"

interface UserDataContextType {
    user: User;
}
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
export function UserDataProvider({ children, user }: { children: React.ReactNode, user: User }) {
    return (
        <UserDataContext.Provider value={{ user }}>
            {children}
        </UserDataContext.Provider>
    );
}




// هوک برای دسترسی به Context

export function useUserData() {

    const context = useContext(UserDataContext);
    if (!context) {

        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
}