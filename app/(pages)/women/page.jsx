"use client";

import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Extract product ID from the query
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`/api/products/${id}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="p-4">
            <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                    <img
                        src={product.images[0]?.defaultImage}
                        alt={product.title}
                        className="w-full"
                    />
                </div>
                <div className="flex-1 lg:pl-6">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-lg text-gray-600 mt-2">₹{product.price}</p>
                    <p className="mt-4">{product.description}</p>
                    <button className="mt-6 px-4 py-2 bg-[#B18E35] text-white rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
