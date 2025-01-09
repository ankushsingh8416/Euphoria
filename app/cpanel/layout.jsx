"use client";

import React from 'react';
import CpanelSidebar from '../Components/CpanelSidebar';
import CpanelNavbar from '../Components/CpanelNavbar';
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
  const pathname = usePathname();

  const isCpanelPage = pathname.startsWith("/cpanel/login");

  return (
    <div>
      {!isCpanelPage && <CpanelNavbar />}
      <div className="flex">
        {!isCpanelPage && <CpanelSidebar />}
        
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
