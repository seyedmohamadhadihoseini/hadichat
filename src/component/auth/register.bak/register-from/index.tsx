"use client";

import { RgAgreeterm, RgConfirmPassword, RgName, RgPassword, RgProgile, RgSubmitButton, RgUsername } from "./elements";
import RegisterAction from "./server/actions";
import { useActionState, useEffect } from "react";
import { toast} from "react-toastify";

import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const router = useRouter();
    const [errorState, formAction] = useActionState(RegisterAction, { id: 1, message: "" });
    useEffect(() => {
        if (errorState.id == 0) {
            toast(`welcome ${errorState.message}`);
            router.push("/");
        }
        else if (errorState.message != "") {
            toast(errorState.message);
        }
    }, [errorState,router])
    return (
        <form action={formAction} className="register-form" id="register-form">
            <RgName />
            <RgUsername />
            <RgPassword />
            <RgConfirmPassword />
            <RgProgile/>
            <RgAgreeterm />
            <RgSubmitButton />
        </form>
    );
}