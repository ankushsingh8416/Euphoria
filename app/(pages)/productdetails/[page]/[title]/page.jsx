"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            // Fetch product details
            axios.get(`/api/products/${id}`)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product details:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false); // Stop loading if id is not available
        }
    }, [router.query]);

    if (loading) {
        return <div>Loading...</div>; // Replace with shimmer effect or spinner
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="w-full lg:w-[95%] shadow-lg mx-auto px-4 py-8">
            <div className="flex flex-col gap-10 lg:flex-row relative">
                {/* Left Section - Images */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-4">
                        <img
                            src={product.images[0]?.defaultImage}
                            alt={product.title}
                            className="w-full rounded-md"
                        />
                    </div>
                </div>

                {/* Right Section - Details */}
                <div className="flex-1 lg:pl-8">
                    <h1 className="text-[25px] lg:text-[30px] crimson tracking-wider mb-4">
                        {product.title}
                    </h1>
                    <p className="text-base lg:text-lg text-gray-500 mt-2">₹{product.price}</p>
                    <p className="text-sm lg:text-base text-gray-400 mt-1">MRP Inclusive of all taxes</p>

                    <p className="text-gray-700 mt-4 text-sm lg:text-base">
                        {product.description}
                    </p>

                    {/* Additional sections like Color, Size, etc. */}
                    {/* ... */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
