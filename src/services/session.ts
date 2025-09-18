"use server"
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import prisma from "./prisma";

export default async function GrantSession(userId: any) {
    const sessionVal = randomUUID();
    const cookiesStore = await cookies()
    cookiesStore.set(`${process.env.NEXT_PUBLIC_SESSION_NAME}`, sessionVal, {
        httpOnly: true
    });
    await prisma.sessions.create({
        data: {
            value: sessionVal,
            userId
        }
    })

}
export async function RemoveSession() {
    const sessionStore  = await cookies();
    await sessionStore.delete(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)
}