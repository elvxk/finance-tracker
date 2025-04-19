import { sanitizeForClient } from "@/lib/sanitizeForClient";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import LogoSidebar from "./logo-sidebar";
import { NavSidebar } from "./nav-sidebar";
import UserSidebar from "./user-sidebar";
import { currentUser } from "@clerk/nextjs/server";

export async function SiteHeader({ ...props }) {
  const userRaw = await currentUser();
  const user = sanitizeForClient(userRaw);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar />
      </SidebarContent>
      <SidebarFooter>
        <UserSidebar user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
