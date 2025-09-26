
import { SidebarHeader, SidebarMenu,  SidebarMenuItem } from "@/components/ui/sidebar";


import ContentHeaderSidebarComponent from "./content";
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