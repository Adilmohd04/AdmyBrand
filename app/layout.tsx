import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Powered Marketing Suite | Transform Your Business Growth",
  description: "Supercharge your marketing with our AI-powered platform. Automate campaigns, unlock insights, and drive results with cutting-edge technology. Start your free trial today!",
  keywords: "AI marketing, marketing automation, campaign optimization, analytics, ROI tracking, digital marketing platform",
  authors: [{ name: "Your Company" }],
  openGraph: {
    title: "AI-Powered Marketing Suite | Transform Your Business Growth",
    description: "Supercharge your marketing with our AI-powered platform. Automate campaigns, unlock insights, and drive results.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Marketing Suite | Transform Your Business Growth",
    description: "Supercharge your marketing with our AI-powered platform. Automate campaigns, unlock insights, and drive results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PerformanceMonitor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
