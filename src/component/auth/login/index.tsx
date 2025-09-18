"use client";



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

import style from "./style.module.css"
import LoginFormAuthComponent from "./signin-form";

export default function LoginUserComponent(
    {LoginServerAction}:{LoginServerAction:(formData:FormData)=>Promise<{success:boolean,message:string}>}) {
    
    return (
        <div className={`${style.container} flex items-center justify-center min-h-screen  bg-gray-100`}>
            <Card className={`${style.card} w-full max-w-md`}>
                <CardHeader>
                    <CardTitle>login</CardTitle>
                    <CardDescription>please enter your username and password for login</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginFormAuthComponent LoginServerAction={LoginServerAction}/>
                    <p className="mt-4 text-center text-sm">
                        needs to create new account?{" "}
                        <Link href="/register" className={style["regiser-link"]}>
                            register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}