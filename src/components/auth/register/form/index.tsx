"use client"
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schema";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import { toast } from "react-toastify";
import SubmitButtonComponent from "./SubmitButton";
import ProfilePictureFiled from "./ProfilePictureFiled";
import FormInputFieldCompnent from "./FormInputField";
export default function FormRegisterShadcn({ RegisterServerAction }:
    { RegisterServerAction: (formData: FormData) => Promise<{ success: boolean, message: string }> }) {
    const [previewImage, setPreviewImage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            profilePicture: undefined,
        },
    });
    const onSubmit = async ({ name, username, password, profilePicture }:
        { name: string; username: string; password: string; profilePicture?: File | undefined; }) => {
        setLoading(true)
        setError("")
        try {
            // آماده‌سازی FormData برای ارسال فایل و داده‌ها
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("password", password);
            if (profilePicture) {
                formData.append("profile", profilePicture);
            }
            const response = await RegisterServerAction(formData)
            if (!response.success) {
                setError(response.message || "some error occure")
                toast.error(response.message || "some error occure");
                return;
            }
            toast.success(`welecome dear ${name} to ${process.env.NEXT_PUBLIC_APP_TITLE}`);
            window.location.href = "/";
        } catch (err) {
            setError("server error , please try again later")
            toast.error("server error , please try again later");
        } finally {
            setLoading(false)
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormInputFieldCompnent control={form.control} name="name" type="text" placeholder="please enter your name" />
                <FormInputFieldCompnent control={form.control} name="username" type="text" placeholder="please enter username" />
                <FormInputFieldCompnent control={form.control} name="password" type="password" placeholder="password" />
                <FormInputFieldCompnent control={form.control} name="confirmPassword" type="password" placeholder="please enter passsword again" />
                <ProfilePictureFiled control={form.control} previewImage={previewImage} setPreviewImage={setPreviewImage} />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <SubmitButtonComponent loading={loading} />
            </form>
        </Form>
    );
}