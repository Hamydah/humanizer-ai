import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Humanizer AI - Bypass Turnitin with Human-like Text",
  description: "Transform AI-generated academic text into natural, human-like writing that bypasses AI detection tools like Turnitin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}