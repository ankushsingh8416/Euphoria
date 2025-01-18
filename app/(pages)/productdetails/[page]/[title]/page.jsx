import { FaHeart, FaTruck } from "react-icons/fa";
import { HiOutlineHome, HiOutlineLocationMarker } from "react-icons/hi";
import { IoBagHandle } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import SimilerProduct from "@/app/Components/SimilerProduct";
import {cartContext} from "@/app/context/cartContext";
import Link from "next/link";
// Shimmer effect CSS
const shimmerClass = "animate-pulse bg-gray-200";

const ProductDetails = () => {
    return (
        <>
            {loading ? (
                <div className="w-full lg:w-[95%] mx-auto px-4 py-8">
                    <div className="flex flex-col gap-10 lg:flex-row">
                        <div className="flex-1">
                            <div className="grid grid-cols-1 gap-4">
                                <div className={`w-full h-[500px] rounded-md ${shimmerClass}`} />
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
                    </div>
                    {/* Add to Cart */}
                    <button className=" flex items-center justify-center gap-2  my-4 sticky bottom-4 lg:static  w-full bg-gradient-to-r from-[#1e381e] to-[#2b4f2b] text-white  py-3 rounded-md transform transition-all duration-300 hover:shadow-lg hover:from-[#2b4f2b] hover:to-[#1e381e] text-sm lg:text-base">
                        Add To Bag
                    <IoBagHandle className="text-white text-xl" />

                    </button>
                    <button className="w-full flex items-center justify-center gap-2 border border-transparent py-3 rounded-md text-black transform transition-all duration-300 shadow-lg border-[#1e381e] text-sm lg:text-base">
                        <FaHeart className="text-red-500 text-xl" />
                        <span>Add to Wishlist</span>
                    </button>
                    {/* Additional Info */}
                    <div className="mt-6 border-t pt-4">
                        <p className="text-xs lg:text-sm text-gray-500">
                            This is a made-to-order style and will take 30 business days for production and dispatch orders within India and internationally.
                        </p>
                        <div className="flex sm:flex-row items-center gap-4 mt-4 border p-4 justify-center border-gray-400">
                            <FaTruck />
                            <p className="text-xs lg:text-sm">Explore Kaftans shipping in 24 hours</p>
                        </div>
                    </div>
                </div>
            )}
            <SimilerProduct
                page={product?.page || ''}
                category={product?.category || ''}
                id={product?._id || ''}
            />        </>
    );
};

export default ProductDetails;
