import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/header/site-header";
import TopSidebar from "@/components/header/top-sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finance Tracker",
  description:
    " A user-friendly web app to track your income and expenses, helping you manage your finances and budget with ease.",
  icons: {
    icon: ["/favicon-16x16.png", "/favicon-32x32.png", "/favicon.ico"],
    apple: "/apple-touch-icon.png",
    android: ["/android-chrome-192x192.png", "/android-chrome-512x512.png"],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({ children }) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {user ? (
              <SidebarProvider defaultOpen={false}>
                <SiteHeader />
                <SidebarInset>
                  <TopSidebar />
                  <div className="p-4 lg:p-6">{children}</div>
                  <Toaster />
                </SidebarInset>
              </SidebarProvider>
            ) : (
              children
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
