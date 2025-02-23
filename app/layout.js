"use client";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./Components/SessionProviderWrapper";
import Link from "next/link";
import { RiChatSmile3Line } from "react-icons/ri";
import { motion } from "framer-motion";
import SmoothScrollProvider from "./Components/SmoothScroll";

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
            <Cartprovider>
              <Toaster />
              {!isNoHeaderFooterRoute && <Navbar />}
              {children}
              {/* Hide chatbot icon when on "/support" route */}
              {pathname !== "/support" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href="/support"
                    className="fixed bottom-6 right-6 md:bottom-4 md:right-10 w-14 h-14 md:w-16 md:h-16 z-50 flex items-center justify-center rounded-full bg-[#1E381E] text-white"
                  >
                    <motion.div
                      animate={{
                        y: ["0%", "-8%", "0%"],
                        filter: [
                          "drop-shadow(0 0 5px rgba(34,197,94,0.6))",
                          "drop-shadow(0 0 15px rgba(34,197,94,1))",
                          "drop-shadow(0 0 5px rgba(34,197,94,0.6))",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: [0.8], // Fast → Slow → Fast effect
                        ease: "easeInOut",
                      }}
                    >
                      <RiChatSmile3Line size={30} />
                    </motion.div>
                  </Link>
                </motion.div>
              )}

              {!isNoHeaderFooterRoute && <Footer />}
            </Cartprovider>
          </SessionProviderWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
