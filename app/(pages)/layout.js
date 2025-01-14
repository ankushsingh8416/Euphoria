"use client"

import React from 'react'
import FilterSection from '../Components/FilterSection'
import { usePathname } from 'next/navigation';

const Layout = ({children}) => {

  const pathname = usePathname();
  const isCpanelPage = pathname.startsWith("/productdetails");
  
  return (
    <div>
        {!isCpanelPage && <FilterSection/>}
        {children}
    </div>
  )
}

export default Layout