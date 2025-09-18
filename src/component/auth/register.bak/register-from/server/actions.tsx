"use server";

import { redirect } from "next/navigation";
import Validate, { userType } from "./validation";
import prisma from "@/services/prisma";
import GrantSession from "@/services/session";
import SaveFileToPublicDir from "@/app/functions/SaveFile";

interface StateType {
    id: number,
    message: string
}
export default async function RegisterAction(prevState: StateType, formData: FormData) {

    let data = Object.fromEntries(formData);


    let errorResult =await Validate(data);
    
    if (errorResult != "") {
        return {
            id: prevState.id+1,
            message: errorResult
        }

    }
    const profileData = formData.get("profile");
    let profile = "";
    if(profileData){
        profile =await SaveFileToPublicDir(profileData as File ,"profiles")||"";
    }
    const user = await prisma.user.create({
        data:{
            name:data.name.toString(),
            password:data.password.toString(),
            username:data.username.toString(),
            profile
        }
    })
    await GrantSession(user.username);
    return {
        id:0,
        message:data.name.toString()
    }
}
