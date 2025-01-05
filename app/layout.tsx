import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans, Scheherazade_New } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

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
  title: "Belajar Tajwid",
  description: "Learn Tajweed rules in Malay language",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body
        className={`${openSans.variable} ${scheherazade.variable} font-sans`}
      >
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
