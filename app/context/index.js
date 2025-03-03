"use client";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";

export const MainProvider = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </UserProvider>
  );
};
