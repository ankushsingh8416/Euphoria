"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const pathname = usePathname();
  const [LocomotiveScroll, setLocomotiveScroll] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's client-side

    import("locomotive-scroll").then((locomotiveModule) => {
      setLocomotiveScroll(() => locomotiveModule.default);
    });
  }, []);

  useEffect(() => {
    if (!LocomotiveScroll || pathname !== "/") return; // Apply only on "/"

    const scrollInstance = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.45, // Adjust for smoothness
    });

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, [LocomotiveScroll, pathname]); // Run when Locomotive is loaded or pathname changes

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
