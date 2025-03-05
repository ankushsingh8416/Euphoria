"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Gif = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <motion.div
          data-scroll-ignore // ✅ Prevent Locomotive from modifying this component
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed z-50 h-44 md:h-52 bottom-2 left-4"
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
            <Image 
              src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741142756/gif_bkcasc.webp" 
              alt="gif" 
              width={300} 
              height={200} 
              className="w-full h-full" 
            />
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default Gif;
