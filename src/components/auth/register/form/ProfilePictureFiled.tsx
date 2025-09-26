import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import style from "../style.module.css"
import { ChangeEvent } from "react";
import { Control } from "react-hook-form";
export default function ProfilePictureFiled({
    control, previewImage, setPreviewImage
}: {
    control: Control<{ name: string; username: string; password: string; confirmPassword: string; profilePicture?: File | undefined; }, unknown, { name: string; username: string; password: string; confirmPassword: string; profilePicture?: File | undefined; }>,
     previewImage: string, setPreviewImage: (x: string) => void
}) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, onChange: (x: File) => void) => {
        if (!e.target.files) {
            setPreviewImage("")
            return
        }
        const file = e.target.files[0];
        onChange(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl)
        } else {
            setPreviewImage("")
        }
    };
    return (
        <FormField
            control={control}
            name="profilePicture"
            render={({ field: { onChange, value, ...field } }) => (
                <FormItem>

                    <FormLabel>profile image(optional)</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={(e) => handleFileChange(e, onChange)}
                            style={{ cursor: "pointer" }}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    {previewImage && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">preview:</p>
                            <Image
                                src={previewImage}
                                alt="profile preview"
                                width={100}
                                height={100}
                                className={`${style.preview} rounded-full object-cover`}
                            />
                        </div>
                    )}
                </FormItem>
            )}
        />
    );
}