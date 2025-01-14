import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans, Scheherazade_New } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { headers } from "next/headers";

// Load Open Sans for Latin text
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// Load Scheherazade New for Arabic text
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
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/login";

  return (
    <html lang="ms">
      <body
        className={`${openSans.variable} ${scheherazade.variable} font-sans`}
      >
        {!isLoginPage && <Header />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
