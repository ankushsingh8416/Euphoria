"use client";
import SmoothScroll from "./Components/SmoothScroll";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./Components/SessionProviderWrapper";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Cartprovider>
            <Toaster />
            <SmoothScroll> {/* Wrapped here */}
              {pathname !== "/support" && <Navbar />}
              {children}
              {pathname !== "/support" && <Footer />}
            </SmoothScroll>
          </Cartprovider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
