import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LuxuryOfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative p-1 bg-gradient-to-br from-amber-100 to-amber-50 max-w-3xl w-full rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Gold border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-600 rounded-xl opacity-70" />

            {/* Inner content with gold border effect */}
            <div className="relative m-1 bg-gradient-to-br from-gray-50 to-amber-50 rounded-lg md:p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-500 opacity-10 rounded-full -translate-x-12 -translate-y-12" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-300 to-amber-500 opacity-10 rounded-full translate-x-16 translate-y-16" />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute md:top-4 md:right-4 top-2 right-2 text-amber-800 hover:text-black bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg z-10 transition-all duration-300 border border-amber-200"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left side - Image with gold overlay */}
                <div className="w-full md:w-1/2 relative bg-amber-50 flex items-center justify-center overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-700 opacity-20" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  <div className="w-full h-full relative">
                    <Image
                      src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741140071/modal_fwfyqi.webp"
                      alt="Exclusive Offer"
                      width={500}
                      height={500}
                      className="w-full h-full hidden md:block object-cover"

                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30" />
                  </div>
                </div>

                {/* Right side - Royal Content */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                    <Crown size={24} className="text-amber-600 mx-3" />
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  </div>

                  <h2 className=" text-xl md:text-2xl font-bold text-amber-900 mb-3 text-center tracking-wide">
                    EUPHORIA COLLECTIONS
                  </h2>

                  <p className="text-amber-800 text-[10px] md:text-[15px] mb-8 font-medium text-center">
                    Enjoy an exclusive <span className="font-bold">15% OFF</span> on your next purchase!
                    <br />
                    Use code <span className="text-amber-900 font-semibold">"royal15"</span> at checkout.
                  </p>

                  <Link
                    href={"/cart"}
                    className="w-full bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-100 font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                    onClick={closeModal}
                  >
                    <ShoppingBag size={16} />
                    <span className="tracking-wider">COMPLETE PURCHASE</span>
                  </Link>

                  <Link
                    href="/women"
                    className="w-full mt-4 bg-transparent hover:bg-amber-50
                    text-amber-800 text-sm font-medium py-2 rounded-lg
                    transition-colors duration-300 border text-center"
                    onClick={closeModal}
                  >
                    {" "}
                    Continue Exploring
                  </Link>

                  <div className="mt-6 text-center">
                    <p className="text-amber-700 text-xs font-medium">
                      Exclusive to our distinguished clientele
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuxuryOfferPopup;
