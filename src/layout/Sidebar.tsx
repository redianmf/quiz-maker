import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/routes/routes";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const AppSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>Quiz App</SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="py-2">
          {routes.map(
            (route) =>
              route.showMenu && (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton asChild>
                    <Link to={route.path}>
                      <Button
                        className="w-full justify-start"
                        variant={
                          pathname === route.path ? "secondary" : "ghost"
                        }
                      >
                        {route.text}
                      </Button>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
