"use client"

import React from 'react';
import FilterSection from '../Components/FilterSection';
import { usePathname } from 'next/navigation';
import { SessionProvider } from "next-auth/react"

const Layout = ({ children }) => {
    const pathname = usePathname();

    // Check if the current path matches any of the noHeaderFooterRoutes patterns
    const noHeaderFooterRoutes = ["/productdetails/", "/search"];
    const isNoHeaderFooterRoute = noHeaderFooterRoutes.some(route => pathname.startsWith(route));

    return (
        <SessionProvider>
        <div>
            {!isNoHeaderFooterRoute && <FilterSection />}
            {children}
        </div>
        </SessionProvider>
    );
};

export default Layout;
