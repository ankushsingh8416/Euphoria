"use client";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isCpanelPage = pathname.startsWith("/cpanel");

  return (
    <html lang="en">
      <body>
        <Cartprovider>
        <Toaster />
          {!isCpanelPage && <Navbar />}
          {children}
          {!isCpanelPage && <Footer />}
        </Cartprovider>
      </body>
    </html>
  );
}
