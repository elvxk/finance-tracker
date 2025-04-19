"use client";

import {
  ChartBarStacked,
  ChartLine,
  FileClock,
  Home,
  WalletCards,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = [
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
];

export function NavSidebar() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {data.map((item, index) => (
              <SidebarMenuButton asChild key={index} tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
