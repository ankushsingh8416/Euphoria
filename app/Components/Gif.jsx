"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Gif = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <motion.div
          initial={{ x: "-100vw" }} // Starts from right side
          animate={{ x: 0 }} // Moves to its position
          exit={{ x: "-100vw" }} // Moves out to the left when closed
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed z-50 h-28 md:h-48 bottom-2 left-4"
        >
          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-0 right-0 bg-gray-800 text-white opacity-0 p-2 rounded-full"
          >
            <X size={18} />
          </button>

          {/* GIF */}
          <img src="/images/gif.webp" alt="gif" className="w-full h-full" />
        </motion.div>
      )}
    </>
  );
};

export default Gif;
