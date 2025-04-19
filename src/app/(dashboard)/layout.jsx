import { SiteHeader } from "@/components/header/site-header";
import TopSidebar from "@/components/header/top-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <SiteHeader />
      <SidebarInset>
        <TopSidebar />
        <main className="p-4 lg:p-6">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
