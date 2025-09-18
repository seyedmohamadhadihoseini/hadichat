"use server"
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export default async function GetCurrentUser(): Promise<User | null> {
    const cookiesStore = await cookies();
    if (cookiesStore.has("chat_session")) {
        const sessionId = cookiesStore.get("chat_session")?.value;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/currentUser?sessionId=${sessionId}`, { cache: "no-store" })
        if (response.status == 200) {
            const data = await response.json();
            return {
                name: data.name,
                username: data.username,
                profile: data.profile,
                createdDate: data.createdDate,
                password: data.password
            }
        }
    }
    return null;
}