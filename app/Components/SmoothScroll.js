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

    scrollInstanceRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1, // Lower value for smoother scrolling
      multiplier: 1.8, // Lower multiplier for slower scrolling
      touchMultiplier: 5, // Adjust touch sensitivity
      firefoxMultiplier: 5, // Adjust for smoother scrolling on Firefox
     
    });
    // Ensure scroll updates dynamically
    setTimeout(() => {
      scrollInstanceRef.current?.update();
    }, 500);

    // Observe DOM changes and update scroll height dynamically
    const observer = new ResizeObserver(() => {
      scrollInstanceRef.current?.update();
    });
    observer.observe(scrollRef.current);

    return () => {
      observer.disconnect();
      scrollInstanceRef.current?.destroy();
    };
  }, [LocomotiveScroll, pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    if (scrollInstanceRef.current) {
      scrollInstanceRef.current.scrollTo(0, { duration: 0, disableLerp: true });
      scrollInstanceRef.current.update(); // Update scroll calculations
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, children]);

  if (pathname !== "/") {
    return <>{children}</>; // No animation on other pages
  }

  return (
    <div ref={scrollRef} data-scroll-container style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
