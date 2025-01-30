
import { Poppins, Outfit } from "next/font/google";
import "../globals.css";
import Navbar from '../components/Navbar';
import PrivateRoute from "../components/PrivateRoute";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "800"
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`${outfit.variable} ${poppins.variable} antialiased`}
      >
        <PrivateRoute>
          <Navbar />
        </PrivateRoute>
        {children}
      </div>
  );
}
