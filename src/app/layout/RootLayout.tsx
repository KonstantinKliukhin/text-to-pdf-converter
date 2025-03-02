import "../styles/globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type { FC, PropsWithChildren } from "react";

import { cn } from "@/shared/lib/ui/cn";
import { Toaster } from "@/shared/ui/Sonner";

import { AllProviders } from "../providers";
import { AppLayout } from "./AppLayout";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--open-sans",
});

export const ROOT_METADATA: Metadata = {
  title: {
    template: "%s | Text to PDF",
    default: "Text to PDF",
  },
  description: "Text to PDF transformer by Kostiantyn Kliukhin",
  manifest: "/site.webmanifest",
  icons: [
    {
      sizes: "32x32",
      href: "/favicon-32x32.png",
      url: "/favicon-32x32.png",
    },
    {
      sizes: "16x16",
      href: "/favicon-16x16.png",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      url: "/favicon-16x16.png",
      sizes: "180x180",
    },
  ],
};

export const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={cn(openSans.className, "h-full min-h-full")}>
      <AllProviders>
        <AppLayout>{children}</AppLayout>
      </AllProviders>
      <Toaster />
    </body>
  </html>
);
