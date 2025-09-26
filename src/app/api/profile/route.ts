import { readFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    let imageName = request.nextUrl.searchParams.get("name");
    if (imageName === "null" || !imageName || imageName.length==0 || imageName == "null") {
        
        imageName = "default";
    }
    if (!existsSync("./public/profiles")) {
        mkdirSync("./public/profiles", { recursive: true });
    }
    const filePath = path.resolve(".", `public/profiles/${imageName}`);
    let imageBuffer: Buffer | undefined;

    try {
        imageBuffer = readFileSync(filePath);
    } catch {
        return new NextResponse("Image not found", { status: 404 });
    }

    // Explicitly convert Buffer to ArrayBuffer
    const arrayBuffer: ArrayBuffer = imageBuffer.buffer.slice(
        imageBuffer.byteOffset,
        imageBuffer.byteOffset + imageBuffer.byteLength
    ) as ArrayBuffer;

    const response = new NextResponse(arrayBuffer);
    response.headers.set("content-type", "image/png");
    return response;
}