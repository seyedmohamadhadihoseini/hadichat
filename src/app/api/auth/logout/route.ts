import { RemoveSession } from "@/services/session";

export async function GET() {
    RemoveSession();
}