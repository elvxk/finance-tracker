import { BadgeSwissFranc, PanelLeftClose } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

const LogoSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" onClick={toggleSidebar}>
              <div className="flex size-8 items-center justify-center aspect-square bg-emerald-0">
                <BadgeSwissFranc />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Finance Tracker</span>
                <span className="truncate text-xs opacity-30">v.1.0.0</span>
              </div>
              <PanelLeftClose className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default LogoSidebar;
