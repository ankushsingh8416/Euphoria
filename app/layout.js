"use client";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noHeaderFooterRoutes = ["/cpanel", "/search"];

  const isNoHeaderFooterRoute = noHeaderFooterRoutes.includes(pathname);

  return (
    
    <html lang="en">
      <body>
        <Cartprovider>
        <Toaster />
<<<<<<< HEAD
          {!isNoHeaderFooterRoute && <Navbar />}
=======
          {!isCpanelPage && <Navbar />}
         
          
>>>>>>> 7d8d1b6be3cde3a76e9fd89d82f9f2a2ae1d9f28
          {children}
          {!isNoHeaderFooterRoute && <Footer />}
        </Cartprovider>
      </body>
    </html>
  );
}
