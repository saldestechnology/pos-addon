import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { FiSettings } from "react-icons/fi";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
            <h1 className="text-xl font-semibold text-gray-900">
              POS Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button className="rounded-lg p-2 hover:bg-gray-100">
                <FiSettings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}