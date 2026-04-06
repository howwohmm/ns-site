import type { Metadata } from "next";
import { Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "noise&signal",
  description: "something is happening at RUAS. this week.",
  openGraph: {
    title: "noise&signal",
    description: "something is happening at RUAS. this week.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full", manrope.variable, "font-sans", geist.variable)}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
