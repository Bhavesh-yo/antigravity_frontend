import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MPLADS e-SAKSHI AI | Ministry of Statistics and Programme Implementation",
  description: "AI-powered dual persona dashboard for MPLADS fund planning, cost benchmarking, and fraud detection oversight.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a]">
        <PersonaProvider defaultMode="mp_planner">
          <Navbar />
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
        </PersonaProvider>
      </body>
    </html>
  );
}
