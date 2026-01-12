import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "../ui/sidebar";
import AppSidebarFavoritesMenu from "./app-sidebar-favorite-menu";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarHistoryMenu from "./app-sidebar-history-menu";

export default function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent className="whitespace-nowrap">
        <SidebarGroup>
          <SidebarGroupLabel>즐겨찾기</SidebarGroupLabel>
          <AppSidebarFavoritesMenu />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>채팅 기록</SidebarGroupLabel>
          <AppSidebarHistoryMenu />
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
