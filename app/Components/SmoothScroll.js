"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const pathname = usePathname();
  const [LocomotiveScroll, setLocomotiveScroll] = useState(null);
  const scrollInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    import("locomotive-scroll").then((locomotiveModule) => {
      setLocomotiveScroll(() => locomotiveModule.default);
    });
  }, [pathname]);

  useEffect(() => {
    if (!LocomotiveScroll || pathname !== "/") return;

    // Initialize Locomotive Scroll only on "/"
    scrollInstanceRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.075,
      multiplier: 2,
    });

    return () => {
      scrollInstanceRef.current?.destroy();
    };
  }, [LocomotiveScroll, pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    if (scrollInstanceRef.current) {
      scrollInstanceRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  if (pathname !== "/") {
    return <>{children}</>; // Return children without animation on other pages
  }

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
