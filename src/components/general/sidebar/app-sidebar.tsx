import {
  Sidebar,
} from "@/components/ui/sidebar"
import ContentSidebarComponent from "./content"
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