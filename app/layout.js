"use client";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar and Footer should not be displayed
  const noHeaderFooterRoutes = ["/cpanel", "/search"];

  // Check if the current pathname matches any of the specified routes
  const isNoHeaderFooterRoute = noHeaderFooterRoutes.includes(pathname);

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
