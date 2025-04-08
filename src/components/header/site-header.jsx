"use client";
import {
  ChartBarStacked,
  ChartLine,
  FileClock,
  Home,
  WalletCards,
} from "lucide-react";
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

const data = {
  navSidebar: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Account",
      url: "/account",
      icon: WalletCards,
    },
    {
      title: "Category",
      url: "/category",
      icon: ChartBarStacked,
    },
    {
      title: "History",
      url: "/history",
      icon: FileClock,
    },
    {
      title: "Statistic",
      url: "/statistic",
      icon: ChartLine,
    },
  ],
};

export function SiteHeader({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar items={data.navSidebar} />
      </SidebarContent>
      <SidebarFooter>
        <UserSidebar />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
