"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const pathname = usePathname();
  const locomotiveScroll = useRef(null);

  useEffect(() => {
    if (pathname !== "/") return; // Apply only on "/"

    if (!scrollRef.current) return;

    locomotiveScroll.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.07, // Adjust for smoothness
    });

    return () => {
      if (locomotiveScroll.current) {
        locomotiveScroll.current.destroy();
      }
    };
  }, [pathname]); // Re-run when pathname changes

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
