"use client";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  const pathname = usePathname();

   const noHeaderFooterRoutes = ["/cpanel/", "/search"];

   const isNoHeaderFooterRoute = noHeaderFooterRoutes.some(route => pathname.startsWith(route));
 
  return (
    
    <html lang="en">
      <body>
        <Cartprovider>
        <Toaster />
          {!isNoHeaderFooterRoute && <Navbar />}
          {children}
          {!isNoHeaderFooterRoute && <Footer />}
        </Cartprovider>
      </body>
    </html>
  );
}
