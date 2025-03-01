"use client";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./Components/SessionProviderWrapper";
import Link from "next/link";
import { RiChatSmile3Line } from "react-icons/ri";
import { motion } from "framer-motion";
import SmoothScrollProvider from "./Components/SmoothScroll";
import Gif from "./Components/Gif";
import EnhancedOfferPopup from "./Components/OfferPopupModal";
import LuxuryOfferPopup from "./Components/OfferPopupModal";
import { AppProviders } from "./context";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noHeaderFooterRoutes = ["/cpanel/", "/search", "/support"];
  const isNoHeaderFooterRoute = noHeaderFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <SessionProviderWrapper>
          <AppProviders>
              <Toaster />
              {!isNoHeaderFooterRoute && <Navbar />}
              {children}
              {!isNoHeaderFooterRoute && <Footer />}
              </AppProviders>
          </SessionProviderWrapper>
        </SmoothScrollProvider>

        {/* Chat Support Button - Hidden on Support Page */}
        {pathname !== "/support" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/support"
              className="fixed bottom-6 right-6 md:bottom-8 md:right-10 w-14 h-14 md:w-16 md:h-16 z-50 flex items-center justify-center rounded-full bg-[#1E381E] text-white shadow-lg hover:bg-[#2a4a2a] transition-colors duration-300"
              style={{
                boxShadow:
                  "0 4px 12px rgba(30, 56, 30, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.15) inset",
              }}
            >
              <motion.div
                animate={{
                  y: ["0%", "-10%", "0%"],
                  scale: [1, 1.08, 1],
                  filter: [
                    "drop-shadow(0 0 5px rgba(34, 197, 94, 0.6))",
                    "drop-shadow(0 0 18px rgba(34, 197, 94, 0.9))",
                    "drop-shadow(0 0 5px rgba(34, 197, 94, 0.6))",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                <RiChatSmile3Line size={28} className="md:text-3xl" />
              </motion.div>
            </Link>
          </motion.div>
        )}

        {pathname !== "/cpanel" && <LuxuryOfferPopup />}

        {/* Show GIF only on Home Page */}
        {pathname === "/" && <Gif />}
      </body>
    </html>
  );
}
