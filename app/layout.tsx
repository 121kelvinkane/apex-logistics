import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apex Logistics | Global Freight Forwarding & Supply Chain Solutions",
  description: "Reliable, secure, and transparent global shipping. Air, sea, and land freight forwarding with real-time tracking and 24/7 support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}