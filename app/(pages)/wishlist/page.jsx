"use client";
import React, { useContext } from "react";
import { Heart, ShoppingCart, Trash2, ArrowRight, X } from "lucide-react";
import { WishlistContext } from "@/app/context/WishlistContext";
import { CartContext } from "@/app/context/CartContext";

const Page = () => {
  const { wishList, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8ECD7] to-[#FCF9F5]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Wishlist Summary */}
        <div className="flex justify-between items-center border-b border-[#1e381e]/20 pb-6 mb-8">
          <h2 className="text-xl md:text-2xl font-medium tracking-wide text-[#1e381e]">
            Your Curated Collection
          </h2>
          <p className="text-sm md:text-base text-[#1e381e]/80 font-medium">
            {wishList.length} {wishList.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Wishlist Empty State */}
        {wishList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-[#F8ECD7] flex items-center justify-center">
              <Heart size={32} className="text-[#1e381e]" />
            </div>
            <p className="text-[#1e381e] mt-6 text-center text-lg font-medium">
              Your wishlist awaits your discerning selections.
            </p>
            <a
              href="/women"
              className="mt-6 inline-flex items-center px-8 py-3 bg-[#1e381e] text-white rounded-none hover:bg-[#2a4a2a] transition-all duration-200 tracking-wide font-medium"
            >
              Explore Collection <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishList.map((product) => {
              const productImage =
                product.images?.length > 0
                  ? product.images[0].defaultImage
                  : "https://via.placeholder.com/300";

              return (
                <div
                  key={product._id}
                  className="group relative overflow-hidden"
                >
                  {/* Remove Button - Top Right */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white bg-opacity-80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#1e381e] hover:text-white"
                  >
                    <X size={16} />
                  </button>

                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F8ECD7]/50">
                    <img
                      src={productImage}
                      alt={product.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Add to Cart Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#1e381e] text-white py-3 text-sm tracking-wide font-medium hover:bg-[#2a4a2a] transition-colors flex items-center justify-center"
                      >
                        <ShoppingCart size={16} className="mr-2" /> Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 px-1">
                    <h3 className="text-base font-medium text-[#1e381e] tracking-wide">
                      {product.title}
                    </h3>
                    <div className="mt-1 flex justify-between items-center">
                      <p className="text-[#1e381e] font-semibold">
                        ₹{product.price?.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-xs text-[#1e381e]/70 font-medium">
                        {product.color || "Classic"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Shopping */}
        {wishList.length > 0 && (
          <div className="mt-12 flex justify-center">
            <a
              href="/women"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-[#1e381e] border-b border-[#1e381e] hover:text-[#2a4a2a] transition-colors tracking-wide"
            >
              Continue Exploring <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
