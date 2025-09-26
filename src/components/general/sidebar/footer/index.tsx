"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useUserData } from "@/hooks/use-userData";
import { ChevronUp, User2 } from "lucide-react";
import style from "./style.module.css"
import { useRouter } from "next/navigation";
import { RemoveSession } from "@/services/session";
export default function FooterSidebarComponent() {
    const {user} = useUserData();
    const router = useRouter();
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <User2 /> {user.name}
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            side="top"
                            className={style.content}
                        >
                            <DropdownMenuItem >
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={async()=>{
                                await RemoveSession();
                                router.refresh();
                            }}>
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}