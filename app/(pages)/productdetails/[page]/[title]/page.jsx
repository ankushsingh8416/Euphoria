"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { FaHeart, FaTruck } from "react-icons/fa";
import { HiOutlineHome, HiOutlineLocationMarker } from "react-icons/hi";
import { IoBagHandle } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import SimilerProduct from "@/app/Components/SimilerProduct";
import Link from "next/link";
import { WishlistContext } from "@/app/context/WishlistContext";
import { CartContext } from "@/app/context/CartContext";
// Shimmer effect CSS
const shimmerClass = "animate-pulse bg-[#f7e7ce]";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = searchParams.get("id");
  const { addToCart } = useContext(CartContext);
  const {  addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <>
    
      {loading ? (
        <div className="w-full lg:w-[95%] mx-auto px-4 py-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4">
                <div
                  className={`w-full h-[500px] rounded-md ${shimmerClass}`}
                />
              </div>
            </div>
            <div className="flex-1 lg:pl-8">
              <div className={`h-8 w-2/3 mb-4 ${shimmerClass}`} />
              <div className={`h-6 w-1/4 mb-2 ${shimmerClass}`} />
              <div className={`h-4 w-1/3 mb-4 ${shimmerClass}`} />
              <div className={`h-24 w-full mb-4 ${shimmerClass}`} />
              <div className={`h-8 w-1/4 mb-6 ${shimmerClass}`} />
              <div className="flex items-center gap-3 mt-2">
                <div className={`w-8 h-8 rounded-full ${shimmerClass}`} />
              </div>
              <div className="flex items-center gap-2 lg:gap-3 mt-2">
                <div className={`w-16 h-8 rounded-md ${shimmerClass}`} />
                <div className={`w-16 h-8 rounded-md ${shimmerClass}`} />
                <div className={`w-16 h-8 rounded-md ${shimmerClass}`} />
              </div>
              <div className={`h-8 w-1/2 my-4 ${shimmerClass}`} />
              <div className={`h-12 w-full rounded-md ${shimmerClass}`} />
              <div className={`h-12 w-full mt-4 rounded-md ${shimmerClass}`} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-[95%] shadow-lg mx-auto px-4 py-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4">
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  pagination={{ clickable: true }}
                  navigation
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={16}
                  loop={true}
                  className="w-full overflow-hidden"
                >
                  {product?.images?.map((image, index) => (
                    <SwiperSlide key={index} className="w-full h-full">
                      <img
                        src={image.defaultImage}
                        alt={`Product Image ${index + 1}`}
                        className="w-full rounded-md"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex-1 lg:pl-8">
              <h1 className="text-[25px] lg:text-[30px] crimson tracking-wider mb-4">
                {product?.title}
              </h1>
              <p className="text-base lg:text-lg text-gray-500 mt-2">
                ₹{product?.price?.toLocaleString()}
              </p>
              <p className="text-sm lg:text-base text-gray-400 mt-1">
                MRP Inclusive of all taxes
              </p>
              <p className="text-gray-700 mt-4 text-sm lg:text-base">
                {product?.description}
              </p>
              <div className="mt-6">
                <p className="text-sm lg:text-base text-gray-700">Colour:</p>
                <div className="flex items-center gap-3 mt-2 cursor-pointer">
                  <div
                    className="w-8 h-8 shadow-xl border-2 border-gray-400 rounded-full transform transition-transform duration-300 hover:scale-125 hover:border-gold-500 hover:shadow-2xl"
                    style={{ backgroundColor: product?.color }}
                  ></div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm lg:text-base text-gray-700">Size:</p>
                <div className="flex items-center gap-2 lg:gap-3 mt-2">
                  {product?.size?.map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1.5 text-xs lg:text-sm border rounded-md hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <a
                  href="#"
                  className="text-xs lg:text-sm text-blue-500 underline mt-2 inline-block"
                >
                  View Size Guide
                </a>
              </div>
              <div className="mt-6">
                <p className="text-sm lg:text-base text-gray-700">
                  Delivery Method:
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <HiOutlineHome />
                    <span>Home Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <HiOutlineLocationMarker />
                    <span>Store Pickup</span>
                  </div>
                </div>
              </div>
              <Link href="/cart">
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center justify-center gap-2 my-4 sticky bottom-4 lg:static w-full bg-gradient-to-r from-[#1e381e] to-[#2b4f2b] text-white py-3 rounded-md transform transition-all duration-300 hover:shadow-lg hover:from-[#2b4f2b] hover:to-[#1e381e] text-sm lg:text-base"
                >
                  Add To Bag
                  <IoBagHandle className="text-white text-xl" />
                </button>
              </Link>
              <Link href="/wishlist">
                <button
                  onClick={() => addToWishlist(product)}
                  className="w-full flex items-center justify-center gap-2 border border-transparent py-3 rounded-md text-black transform transition-all duration-300 shadow-lg border-[#1e381e] text-sm lg:text-base"
                >
                  <FaHeart className="text-red-500 text-xl" />
                  <span>Add to Wishlist</span>
                </button>
              </Link>
              <div className="mt-6 border-t pt-4">
                <p className="text-xs lg:text-sm text-gray-500">
                  This is a made-to-order style and will take 30 business days
                  for production and dispatch orders within India and
                  internationally.
                </p>
                <div className="flex sm:flex-row items-center gap-4 mt-4 border p-4 justify-center border-gray-400">
                  <FaTruck />
                  <p className="text-xs lg:text-sm">
                    Explore Kaftans shipping in 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SimilerProduct
        page={product?.page || ""}
        category={product?.category || ""}
        id={product?._id || ""}
      />{" "}
    </>
  );
};

export default ProductDetails;
