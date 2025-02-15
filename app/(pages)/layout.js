"use client"

import React from 'react';
import FilterSection from '../Components/FilterSection';
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
    const pathname = usePathname();

    // Check if the current path matches any of the noHeaderFooterRoutes patterns
    const noHeaderFooterRoutes = ["/productdetails/", "/search" , "/cart"];
    const isNoHeaderFooterRoute = noHeaderFooterRoutes.some(route => pathname.startsWith(route));

    return (
        <div>
            {!isNoHeaderFooterRoute && <FilterSection />}
            {children}
        </div>      
    );
};

export default Layout;
