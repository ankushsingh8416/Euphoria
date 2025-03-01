"use client";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { AuthTokenProvider } from "./AuthTokenContext";
import { FilterProvider } from "./FilterContext";
import { CategoryProvider } from "./CategoryContext";
import { GridProvider } from "./GridContext";
import { SearchProvider } from "./SearchContext";

export const AppProviders = ({ children }) => {
  return (
    <AuthTokenProvider>
      <CartProvider>
        <WishlistProvider>
          <FilterProvider>
            <CategoryProvider>
              <GridProvider>
                <SearchProvider>{children}</SearchProvider>
              </GridProvider>
            </CategoryProvider>
          </FilterProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthTokenProvider>
  );
};
