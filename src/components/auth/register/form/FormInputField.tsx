import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

export default function FormInputFieldCompnent({ name, control, type ,placeholder}: {
    name: "name" | "password" | "username" | "confirmPassword", type: "text" | "password",placeholder:string
    control: Control<{ name: string; username: string; password: string; confirmPassword: string; profilePicture?: File | undefined; }, unknown, { name: string; username: string; password: string; confirmPassword: string; profilePicture?: File | undefined; }>
}) {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{name}</FormLabel>
                    <FormControl>
                        <Input type={type} placeholder={placeholder} autoComplete={""} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}