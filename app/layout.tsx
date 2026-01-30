import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { PostHogProvider } from "@/providers/posthog-provider";
import { CalProvider } from "@/providers/cal-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoFlux - We Build AI Automation Systems That Drive Growth",
  description:
    "We build custom AI automation systems that clean your lead gen, sync your tools, and unlock capacity—so you can scale without hiring.",
  icons: {
    icon: "/images/autoflux-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <PostHogProvider>
            <CalProvider>{children}</CalProvider>
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
