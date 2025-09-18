import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import ContentSidebarComponent from "./content"
import { Chat } from "@prisma/client"
import HeaderSidebarComponent from "./header"
import FooterSidebarComponent from "./footer"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <HeaderSidebarComponent />
      <ContentSidebarComponent  />
      <FooterSidebarComponent />
    </Sidebar>
  )
}