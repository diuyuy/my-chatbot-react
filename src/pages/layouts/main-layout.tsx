import AppSidebar from "@/components/app-sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="md:hidden ml-2 mt-2" />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
