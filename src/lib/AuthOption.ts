
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/services/prisma";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where:{username:credentials?.username,password:credentials?.password}
                })
                if(user){
                    return {
                        id:user.username,
                        
                    }
                }   
                return null;
            },
        })
    ],
}