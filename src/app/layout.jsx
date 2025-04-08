import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
