"use client"

import { DropdownMenu, DropdownMenuContent,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import style from "./style.module.css"
import { useState } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import NewUserHeaderComponent from "./user";
import NewGroupHeaderComponent from "./group";



export default function ContentHeaderSidebarComponent() {
    const [open, setOpen] = useState(false);
   

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    new chat
                    <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={style.menucontent} >
                <NewUserHeaderComponent />
                <NewGroupHeaderComponent />
            </DropdownMenuContent>
        </DropdownMenu>

    );
}