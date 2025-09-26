"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
export const signupSchema = z

  .object({

    name: z.string().min(2, "should have at least 2 charachters"),

    username: z.string().min(4, "should have at least 4 charachters"),
    password: z.string().min(4, "password must be at least 4 charachter"),
    confirmPassword: z.string().min(4, "password must be at least 4 charachter"),
    profilePicture: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {
        message: "just png or jpg",
      })

      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {

        message: "must be lower than 5mb",

      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirm password must be same",
    path: ["confirmPassword"],
  });


