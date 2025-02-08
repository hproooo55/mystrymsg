
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import { useState } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  
  let modetoggle = 'dark'
  modetoggle='light'
  return (
    <html lang="en" className="overflow-hidden">
      
      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative overflow-x-hidden antialiased h-screen w-screen relative bg-gradient-to-bl from-pink-500/50 to-purple-600/50`}
      >
        <Navbar/>
        {children}
        <Toaster />

      </body>
      </AuthProvider>
    </html>
  );
}
