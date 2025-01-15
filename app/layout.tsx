import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans, Scheherazade_New } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

export const metadata: Metadata = {
  title: "Belajar Supabase",
  description: "Learn Supabase in Malay language",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body
        className={`${openSans.variable} ${scheherazade.variable} font-sans h-screen bg-gradient-to-b from-background to-muted`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
