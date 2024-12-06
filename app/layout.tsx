import type { Metadata } from "next";
import { meta } from "@/meta/meta";
import localFont from "next/font/local";
import "./globals.css";
import { OrderProvider } from "@/context/OrderContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  );
}
