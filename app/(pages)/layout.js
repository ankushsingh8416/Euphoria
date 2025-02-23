"use client";

import React, { useEffect } from "react";
import FilterSection from "../Components/FilterSection";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();

  // Check if the current path matches any of the noHeaderFooterRoutes patterns
  const noHeaderFooterRoutes = [
    "/productdetails/",
    "/search",
    "/cart",
    "/edit",
    "/support",
    "/wishlist",
  ];
  const isNoHeaderFooterRoute = noHeaderFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div>
      {!isNoHeaderFooterRoute && <FilterSection />}
      {children}
    </div>
  );
};

export default Layout;
