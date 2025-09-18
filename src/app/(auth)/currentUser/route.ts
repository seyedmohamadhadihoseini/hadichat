import prisma from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const sessionVal = request.nextUrl.searchParams.get("sessionId");
    const session = await prisma.sessions.findFirst({
        where: {
            value: sessionVal?.toString()
        }
    });
    if (session) {
        const user = await prisma.user.findFirst({
            where: {
                username: session.userId
            }
        });

        const res= NextResponse.json(user,{
            status:200
        });
        
        return res;
    }
    return NextResponse.json({},{
        status:404
    });
}