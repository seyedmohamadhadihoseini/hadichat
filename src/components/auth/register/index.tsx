"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "../redux/store";

import FormRegisterShadcn from "./form";
import style from "./style.module.css"
export default function RegisterNewUserComponent({ RegisterServerAction }:
    { RegisterServerAction: (formData: FormData) => Promise<{ success: boolean, message: string }> }) {


    return (
        <Provider store={store}>
            <div className={`${style.container} flex items-center justify-center min-h-screen bg-gray-100`}>
                <Card className={`${style.card} w-full max-w-md`}>
                    <CardHeader className={style.header}>
                        <CardTitle className={style.title}>register</CardTitle>
                        <CardDescription>fill your information to register</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormRegisterShadcn RegisterServerAction={RegisterServerAction} />
                        <p className="mt-4 text-center text-sm">
                            are you have user account ?{" "}
                            <Link href="/login" className={style.login}>
                                login
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Provider>
    );

}