
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystrymsg",
  description: "Send me Anonymus messages!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en" className="">
      
      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-white`}
      >
        <div className="flex flex-col overflow-x-hidden relative">
        <Navbar/>
        <div className="mt-10">
        {children}
        </div>
        </div>
        <Toaster />

      </body>
      </AuthProvider>
    </html>
  );
}
