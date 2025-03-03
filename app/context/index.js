"use client";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";

export const MainProvider = ({ children }) => {
  return (
    <CartProvider>

    <UserProvider>
      <AuthProvider>
        <ProductProvider>
            <WishlistProvider>{children}</WishlistProvider>
        </ProductProvider>
      </AuthProvider>
    </UserProvider>
    </CartProvider>

  );
};
