import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Simplifying job hunt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${satoshi.className}  antialiased`}
        >
          <div className="w-full h-screen flex flex-col items-center justify-center">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
