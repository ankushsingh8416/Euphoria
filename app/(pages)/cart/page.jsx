"use client";
import React, { useContext, useState, useEffect } from "react";
import { cartContext } from "@/app/context/cartContext";
import { useSession } from "next-auth/react";
import {
  ShoppingBag,
  Heart,
  Trash2,
  ChevronLeft,
  Award,
  Gift,
  Shield,
  Crown,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/app/Components/Loader";

const Page = () => {
  const { cart, removeFromCart, addToWishlist, setCart } =
    useContext(cartContext);
  const [quantities, setQuantities] = useState(cart.map(() => 1));
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setQuantities(cart.map(() => 1));
  }, [cart.length]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = parseInt(newQuantity);
    setQuantities(updatedQuantities);
  };

  const calculateSubtotal = () => {
    return cart
      .reduce(
        (total, product, index) => total + product.price * quantities[index],
        0
      )
      .toFixed(2);
  };

  const calculateTotalPrice = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const total = promoApplied ? subtotal * 0.85 : subtotal;
    return total.toFixed(2);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "royal15") {
      setPromoApplied(true);
      toast.success("Promo code applied successfully");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Payment intigration with Razorpay

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // components/PaymentSuccess.js (or wherever your payment logic is)
  const handlePayment = async () => {
    setLoading(true);

    // Prepare cart data for storage
    const cartData = {
      email: session.user.email,
      products: cart.map((item, index) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: quantities[index],
      })),
      totalAmount: parseFloat(calculateTotalPrice()),
    };

    // Call Razorpay API
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: calculateTotalPrice() }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_R9imru43nM8kiI",
      amount: data.amount,
      currency: "INR",
      name: "Euphoria",
      description: "Payment for your order",
      order_id: data.id,
      handler: async (response) => {
        // Store cart data in MongoDB after successful payment
        const storeCartResponse = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartData),
        });

        if (storeCartResponse.ok) {
          toast.success("Payment Successful! Cart data stored.");
          setCart([]); // Clear the cart
          router.push("/"); // Redirect to home page
        } else {
          toast.error("Failed to store cart data.");
        }

        setLoading(false);
      },
      theme: { color: "#1E381E" },
      prefill: {
        name: session?.user?.name,
        email: session?.user?.email,
      },
    };

    new window.Razorpay(options).open();
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(117.86deg, #F8ECD7 -6.6%, #FCF9F5 95.63%)",
      }}
    >
      {/* Page Title  */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left"
          style={{ color: "#1e381e" }}
        >
          Shopping Cart
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3">
            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{ boxShadow: "0 8px 30px rgba(30, 56, 30, 0.1)" }}
            >
              <div
                className="p-5 sm:p-6 border-b flex justify-between items-center"
                style={{ borderColor: "rgba(30, 56, 30, 0.1)" }}
              >
                <h2 className="text-xl" style={{ color: "#1e381e" }}>
                  Your Selections
                </h2>
                <div
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(30, 56, 30, 0.08)",
                    color: "#1e381e",
                  }}
                >
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 sm:py-20">
                  <div
                    className="p-5 rounded-full"
                    style={{ backgroundColor: "rgba(30, 56, 30, 0.08)" }}
                  >
                    <ShoppingBag size={50} style={{ color: "#1e381e" }} />
                  </div>
                  <p
                    className="text-base sm:text-lg font-medium text-center max-w-sm px-4"
                    style={{ color: "#1e381e" }}
                  >
                    Your collection awaits your exquisite selections
                  </p>
                  <a
                    href="/women"
                    className="mt-2 flex items-center gap-1.5 font-medium text-sm transition-colors py-2 px-4 rounded-lg"
                    style={{
                      color: "#1e381e",
                      border: "1px solid rgba(30, 56, 30, 0.3)",
                    }}
                  >
                    <ChevronLeft size={16} />
                    Continue Exploring
                  </a>
                </div>
              ) : (
                <div
                  className="divide-y"
                  style={{ borderColor: "rgba(30, 56, 30, 0.08)" }}
                >
                  {cart.map((product, index) => {
                    // Defensive check for images
                    const defaultImage =
                      product?.images?.[0]?.defaultImage ||
                      "https://via.placeholder.com/150";

                    return (
                      <div
                        key={index}
                        className="p-4 sm:p-6 transition-all hover:bg-gray-50"
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="sm:w-1/4 aspect-square flex-shrink-0 max-w-[140px] sm:max-w-none mx-auto sm:mx-0">
                            <div className="relative h-full w-full group">
                              <div
                                className="absolute inset-0 rounded-lg"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(30, 56, 30, 0.05) 0%, rgba(30, 56, 30, 0.12) 100%)",
                                  transform: "translate(5px, 5px)",
                                  zIndex: 0,
                                }}
                              ></div>
                              <Link
                                className="h-full w-full block rounded-lg overflow-hidden relative z-10 bg-white border"
                                style={{
                                  borderColor: "rgba(30, 56, 30, 0.12)",
                                }}
                                href={{
                                  pathname: `/productdetails/${product.page}/${product.title}`,
                                  query: { id: product._id },
                                }}
                              >
                                <img
                                  src={defaultImage}
                                  alt={product.title || "Product Image"}
                                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                />
                              </Link>
                            </div>
                          </div>

                          <div className="sm:w-3/4 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                <div>
                                  <Link
                                    className="text-base sm:text-lg font-bold tracking-tight text-center sm:text-left"
                                    style={{ color: "#1e381e" }}
                                    href={{
                                      pathname: `/productdetails/${product.page}/${product.title}`,
                                      query: { id: product._id },
                                    }}
                                  >
                                    {product.title}
                                  </Link>

                                  <div className="mt-2 space-y-1.5 text-center sm:text-left">
                                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                                      <span
                                        className="text-xs sm:text-sm font-medium"
                                        style={{ color: "#1e381e" }}
                                      >
                                        Brand
                                      </span>
                                      <span
                                        className="h-3 w-px opacity-30"
                                        style={{ backgroundColor: "#1e381e" }}
                                      ></span>
                                      <span className="text-xs sm:text-sm text-gray-600">
                                        {product.brand || "Royal Collection"}
                                      </span>
                                    </p>
                                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                                      <span
                                        className="text-xs sm:text-sm font-medium"
                                        style={{ color: "#1e381e" }}
                                      >
                                        Color
                                      </span>
                                      <span
                                        className="h-3 w-px opacity-30"
                                        style={{ backgroundColor: "#1e381e" }}
                                      ></span>
                                      <span className="text-xs sm:text-sm text-gray-600">
                                        {product.color || "Classic"}
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                <p
                                  className="text-lg sm:text-xl font-semibold tracking-tight text-center sm:text-right"
                                  style={{ color: "#1e381e" }}
                                >
                                  ₹
                                  {(product.price * quantities[index]).toFixed(
                                    2
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mt-4 gap-3">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => addToWishlist(product)}
                                  className="flex items-center gap-1.5 transition-colors hover:opacity-70 group px-2 py-1 rounded-lg"
                                  style={{
                                    color: "#2F5D2F",
                                    backgroundColor: "rgba(47, 93, 47, 0.08)",
                                  }}
                                >
                                  <Heart
                                    size={14}
                                    className="transition-all duration-300 group-hover:scale-110"
                                  />
                                  <span className="text-xs font-medium">
                                    Wishlist
                                  </span>
                                </button>

                                <button
                                  onClick={() => removeFromCart(product._id)}
                                  className="flex items-center gap-1.5 transition-colors hover:opacity-70 group px-2 py-1 rounded-lg"
                                  style={{
                                    color: "#B22222",
                                    backgroundColor: "rgba(178, 34, 34, 0.08)",
                                  }}
                                >
                                  <Trash2
                                    size={14}
                                    className="transition-all duration-300 group-hover:scale-110"
                                  />
                                  <span className="text-xs font-medium">
                                    Remove
                                  </span>
                                </button>
                              </div>

                              <div className="flex items-center">
                                <label
                                  htmlFor={`quantity-${index}`}
                                  className="mr-2 text-xs font-medium"
                                  style={{ color: "#1e381e" }}
                                >
                                  Quantity
                                </label>
                                <div className="relative">
                                  <select
                                    id={`quantity-${index}`}
                                    className="appearance-none py-1.5 pl-3 pr-8 border rounded-lg bg-white focus:outline-none focus:ring-1 text-xs"
                                    style={{
                                      color: "#1e381e",
                                      borderColor: "rgba(30, 56, 30, 0.2)",
                                      minWidth: "70px",
                                    }}
                                    value={quantities[index]}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                      <option key={num} value={num}>
                                        {num}
                                      </option>
                                    ))}
                                  </select>
                                  <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
                                    style={{ color: "#1e381e" }}
                                  >
                                    <svg
                                      className="h-3 w-3 fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="p-4 sm:p-6 flex justify-between items-center">
                    <a
                      href="/women"
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-70"
                      style={{ color: "#1e381e" }}
                    >
                      <ChevronLeft size={14} />
                      Continue Shopping
                    </a>

                    <div className="text-xs text-gray-500">
                      Free shipping on all orders
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3">
            <div
              className="bg-white rounded-xl lg:sticky lg:top-20"
              style={{ boxShadow: "0 8px 30px rgba(30, 56, 30, 0.1)" }}
            >
              <div
                className="p-5 sm:p-6 border-b"
                style={{
                  borderColor: "rgba(30, 56, 30, 0.1)",
                  background:
                    "linear-gradient(to right, rgba(30, 56, 30, 0.03), rgba(30, 56, 30, 0.01))",
                }}
              >
                <div className="flex items-center gap-2">
                  <Crown size={16} style={{ color: "#1e381e" }} />
                  <h2
                    className="text-lg sm:text-xl font-bold tracking-tight"
                    style={{ color: "#1e381e" }}
                  >
                    Order Summary
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Merchandise Subtotal
                    </span>
                    <span
                      className="font-bold text-sm sm:text-base"
                      style={{ color: "#1e381e" }}
                    >
                      ₹{calculateSubtotal()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-600">
                        Premium Delivery
                      </span>
                      <div
                        className="flex items-center justify-center rounded-full h-4 w-4"
                        style={{ backgroundColor: "rgba(30, 56, 30, 0.08)" }}
                      >
                        <Award size={10} style={{ color: "#1e381e" }} />
                      </div>
                    </div>
                    <span
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: "#4F7942" }}
                    >
                      Complimentary
                    </span>
                  </div>

                  {promoApplied && (
                    <div
                      className="flex justify-between"
                      style={{ color: "#4F7942" }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">
                          Royal Discount (15%)
                        </span>
                        <div className="h-4 w-4 bg-green-50 rounded-full flex items-center justify-center">
                          <Check size={10} style={{ color: "#4F7942" }} />
                        </div>
                      </div>
                      <span className="text-sm">
                        -₹{(parseFloat(calculateSubtotal()) * 0.15).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="my-6 py-4"
                  style={{
                    borderTop: "1px solid rgba(30, 56, 30, 0.1)",
                    borderBottom: "1px solid rgba(30, 56, 30, 0.1)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className="text-base font-bold tracking-tight"
                      style={{ color: "#1e381e" }}
                    >
                      Order Total
                    </span>
                    <span
                      className="text-xl sm:text-2xl font-bold tracking-tight"
                      style={{ color: "#1e381e" }}
                    >
                      ₹{calculateTotalPrice()}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e381e" }}
                  >
                    Exclusive Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo"
                      placeholder="Enter your royal code"
                      className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1"
                      style={{
                        borderColor: "rgba(30, 56, 30, 0.2)",
                        color: "#1e381e",
                        backgroundColor: promoApplied
                          ? "rgba(79, 121, 66, 0.05)"
                          : "white",
                      }}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button
                      className="px-4 py-2.5 rounded-lg text-white font-medium text-sm transition-all whitespace-nowrap"
                      style={{
                        backgroundColor: promoApplied ? "#4F7942" : "#1e381e",
                        opacity: promoApplied ? 0.9 : 1,
                      }}
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 text-xs" style={{ color: "#4F7942" }}>
                      Royal discount code successfully applied to your order.
                    </p>
                  )}
                </div>

                <button
                  className="w-full py-3.5 rounded-lg text-white font-medium text-center text-sm sm:text-base transition-all relative overflow-hidden"
                  style={{
                    backgroundColor:
                      cart.length === 0 ||
                      parseFloat(calculateTotalPrice()) === 0
                        ? "rgba(30, 56, 30, 0.5)"
                        : "#1e381e", // Dimmed background when disabled
                    boxShadow:
                      cart.length === 0 ||
                      parseFloat(calculateTotalPrice()) === 0
                        ? "none"
                        : "0 8px 15px rgba(30, 56, 30, 0.25)", // Remove shadow when disabled
                    opacity:
                      cart.length === 0 ||
                      parseFloat(calculateTotalPrice()) === 0
                        ? 0.7
                        : 1, // Reduce opacity when disabled
                  }}
                  onClick={handlePayment}
                  disabled={
                    loading ||
                    cart.length === 0 ||
                    parseFloat(calculateTotalPrice()) === 0
                  }
                >
                  <span className="relative z-10 tracking-wider uppercase">
                    {loading ? <Loader /> : "Proceed to Pay"}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.8) 30%, transparent 40%)",
                      animation: "shine 3s ease-in-out infinite",
                      display:
                        cart.length === 0 ||
                        parseFloat(calculateTotalPrice()) === 0
                          ? "none"
                          : "block",
                    }}
                  ></div>
                </button>

                <div className="mt-6 space-y-4">
                  <div
                    className="grid grid-cols-3 gap-2 p-4 rounded-lg"
                    style={{ backgroundColor: "rgba(30, 56, 30, 0.04)" }}
                  >
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Shield size={16} style={{ color: "#1e381e" }} />
                      <span className="text-gray-600 text-xs">
                        Secure Checkout
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Gift size={16} style={{ color: "#1e381e" }} />
                      <span className="text-gray-600 text-xs">
                        Luxury Packaging
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Award size={16} style={{ color: "#1e381e" }} />
                      <span className="text-gray-600 text-xs">
                        Premium Service
                      </span>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p>Prices include all applicable taxes</p>
                    <p className="mt-1">Expected delivery: 2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          20% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
