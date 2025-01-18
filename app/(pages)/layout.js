"use client"

import React from 'react'
import FilterSection from '../Components/FilterSection'
import { usePathname } from 'next/navigation';

const Layout = ({children}) => {

  const pathname = usePathname();

  const noHeaderFooterRoutes = ["/productdetails", "/search"];

  const isNoHeaderFooterRoute = noHeaderFooterRoutes.includes(pathname);
  
  return (
    <div>
        {!isNoHeaderFooterRoute && <FilterSection/>}
        {children}
    </div>
  )
}

export default Layout