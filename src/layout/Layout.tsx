import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="flex w-full h-dvh overflow-y-clip">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 min-w-0 flex flex-col overflow-y-hidden">
          <header className="flex h-12 items-center border-b px-3 shrink-0">
            <SidebarTrigger />
          </header>

          <div className="flex-1 h-full overflow-y-auto">
            <Outlet />
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </div>
  );
};

export default Layout;
