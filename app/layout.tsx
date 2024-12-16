import type { Metadata } from "next";
import { Geist,Poppins } from "next/font/google";
import "./globals.css";
import NextUiProvider from "@/providers/NextUiProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ], 
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${poppins.variable} antialiased`}
      >
        <NextUiProvider>
        {children}
        </NextUiProvider>
      
      </body>
    </html>
  );
}
