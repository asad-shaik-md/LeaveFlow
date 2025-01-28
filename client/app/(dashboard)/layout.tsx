import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "../globals.css";
import Navbar from '../components/Navbar'

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "800"
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leave Flow",
  description: "A Web App for Leave Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
