"use client";
import { useSession } from "next-auth/react";
import { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

export const Cartprovider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Price: [],
    Color: [],
    Size: [],
    Brand: [],
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeView, setActiveView] = useState("grid");
  const [productGrid, setproductGrid] = useState("four");
  const [sortOption, setSortOption] = useState("Price:LowtoHigh");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const { data: session } = useSession();

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [wishList, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const savedList = localStorage.getItem("wishList");
      return savedList ? JSON.parse(savedList) : [];
    }
    return [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item._id === product._id);
      if (isProductInCart) {
        console.log("Product is already in the cart");
        return prevCart;
      }

      const updatedProduct = {
        ...product,
        user: {
          name: session?.user?.name || "Guest",
          email: session?.user?.email || "guest@example.com",
        },
      };

      const updatedCart = [...prevCart, updatedProduct];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Send cart to backend
      sendCartToBackend(updatedCart);

      return updatedCart;
    });
  };
 //wishlist
 const addToWishlist = (product) => {
  setWishlist((prevList) => {
    // Check if the product is already in the list
    const isProductInList = prevList.some((item) => item._id === product._id);

    if (isProductInList) {
      console.log("Product is already in the wishlist");
      return prevList; // Return the previous list without adding the product again
    }

    const updatedProduct = {
      ...product,
      user: {
        name: session?.user?.name || "Guest",
        email: session?.user?.email || "guest@example.com",
      },
    };

    const updatedList = [...prevList, updatedProduct];
    console.log("data" + updatedList);

    // Save list in localStorage
    localStorage.setItem("wishList", JSON.stringify(updatedList));

    // Send list to backend
    // sendListToBackend(updatedList);

    return updatedList;
  });
};
  // Function to send cart data to backend
  const sendCartToBackend = async (cartData) => {
    try {
      const requestBody = {
        user: cartData[0]?.user || {
          name: "Guest",
          email: "guest@example.com",
        },
        products: cartData.map((item) => ({
          productId: item._id, // Ensure your product has an `_id`
          quantity: item.quantity || 1,
        })),
      };

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Cart sent to backend:", result);
    } catch (error) {
      console.error("Error sending cart data to backend:", error);
    }
  };
  // Function to send wishList data to backend
  const sendWishlistToBackend = async (ListData) => {
    try {
      const requestBody = {
        user: ListData[0]?.user || {
          name: "Guest",
          email: "guest@example.com",
        },
        products: ListData.map((item) => ({
          productId: item._id, // Ensure your product has an `_id`
          quantity: item.quantity || 1,
        })),
      };

      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("List sent to backend:", result);
    } catch (error) {
      console.error("Error sending list data to backend:", error);
    }
  };
//remove item From Cart
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(newCart));
      sendCartToBackend(newCart);
      return newCart;
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prevList) => {
      const isProductInList = prevList.some((item) => item._id === product._id);
      if (isProductInList) {
        console.log("Product is already in the wishlist");
        return prevList;
      }
      const updatedProduct = {
        ...product,
        user: {
          name: session?.user?.name || "Guest",
          email: session?.user?.email || "guest@example.com",
        },
      };
      const updatedList = [...prevList, updatedProduct];
      localStorage.setItem("wishList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const removeFromWishlist = (index) => {
    setWishlist((prevList) => {
      const newList = prevList.filter((_, i) => i !== index);
      localStorage.setItem("wishList", JSON.stringify(newList));
      return newList;
    });
  };

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  const fourGrid = () => {
    setActiveView("grid");
    setproductGrid("four");
  };
  const twoGrid = () => {
    setActiveView("list");
    setproductGrid("two");
  };
  const handleFilterChange = (filter, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: prev[filter].includes(option)
        ? prev[filter].filter((item) => item !== option)
        : [...prev[filter], option],
    }));
  };

  return (
    <cartContext.Provider
      value={{
        selectedFilters,
        setSelectedFilters,
        handleFilterChange,
        totalProducts,
        activeView,
        setSortOption,
        products,
        setProducts,
        sortOption,
        isSearchOpen,
        setIsSearchOpen,
        fourGrid,
        twoGrid,
        productGrid,
        cart,
        addToCart,
        removeFromCart,
        addToWishlist,
        wishList,
        removeFromWishlist,
        addToWishlist
      }}
    >
      {children}
    </cartContext.Provider>
  );
};