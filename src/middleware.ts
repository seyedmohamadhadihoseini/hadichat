import { NextRequest, NextResponse } from "next/server";
import GetCurrentUser from "./services/getUser";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        const user = await GetCurrentUser();
        if (user)
            return NextResponse.redirect(new URL("/", req.url));
    }
    else if (pathname.startsWith("/chat")) {
        const user = await GetCurrentUser();
        if (!user)
            return NextResponse.redirect(new URL("/login", req.url));
    }
}