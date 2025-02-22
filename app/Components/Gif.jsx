"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const Gif = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isClosed = localStorage.getItem("gifClosed");
    if (!isClosed) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("gifClosed", "true"); // Store closed state
  };

  return (
    <>
      {visible && (
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed z-50 h-36 md:h-48 bottom-2 left-4"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute opacity-0 top-0 right-0 bg-gray-800 text-white p-2 rounded-full"
          >
            <X size={18} />
          </button>

          {/* GIF */}
          <Link href={"/sale"}>
            <img src="/images/gif.webp" alt="gif" className="w-full h-full" />
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default Gif;
