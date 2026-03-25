import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <SidebarTrigger />
        <div className="p-3">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
