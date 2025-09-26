import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import loginSchema from "./schema";

import { toast } from "react-toastify";
export default function LoginFormAuthComponent({ LoginServerAction }: { LoginServerAction: (formData: FormData) => Promise<{ success: boolean, message: string }> }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // تنظیم فرم با react-hook-form

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    // هندل کردن submit فرم
    const onSubmit = async ({ username, password }: { username: string, password: string }) => {
        setLoading(true)
        setError("")
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        const { success, message } = await LoginServerAction(data);
        if (success) {
            setError(message || "successfully login");
            toast.success(message || "successfully login");
            window.location.href = "/";
        } else {
            toast.error("the username or password is wrong")
            setError("the username or password is wrong")
        }
        setLoading(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>username</FormLabel>
                            <FormControl>
                                <Input placeholder="enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "loading..." : "login"}
                </Button>
            </form>
        </Form>
    );
}