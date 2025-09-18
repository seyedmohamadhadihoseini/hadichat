
import { SidebarHeader, SidebarMenu,  SidebarMenuItem } from "@/components/ui/sidebar";


import ContentHeaderSidebarComponent from "./content";
import { AddUserChatAction } from "@/app/chat/server";
export default function HeaderSidebarComponent() {

    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ContentHeaderSidebarComponent />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    );
}