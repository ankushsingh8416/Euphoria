"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import CpanelSidebar from "../Components/CpanelSidebar";
import CpanelNavbar from "../Components/CpanelNavbar";
import { CpanelProvider } from "./context/cpanelContext";
import "./style.css";
const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isCpanelPage = pathname.startsWith("/cpanel/login");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/cpanel/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="w-full bg-[rgba(255,255,255,0.5)] backdrop-blur-sm h-screen flex items-center justify-center">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="cpanel">
      <CpanelProvider>
        {!isCpanelPage && <CpanelNavbar />}
        <div className="flex">
          {!isCpanelPage && <CpanelSidebar />}
          <div className="w-full">{children}</div>
        </div>
      </CpanelProvider>
    </div>
  );
};

export default Layout;
