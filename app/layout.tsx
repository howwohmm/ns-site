import type { Metadata } from "next";
import { Manrope, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "noise&signal",
  description: "something is happening at RUAS. this week.",
  icons: { icon: "/logos/08-outlined-red.svg" },
  openGraph: {
    title: "noise&signal",
    description: "something is happening at RUAS. this week.",
    type: "website",
    images: [{ url: "/logos/08-outlined-red.png", width: 600, height: 600 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full", manrope.variable, playfair.variable, inter.variable, "font-sans")}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
