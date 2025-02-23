"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const pathname = usePathname();
  const [LocomotiveScroll, setLocomotiveScroll] = useState(null);
  const scrollInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("locomotive-scroll").then((locomotiveModule) => {
      setLocomotiveScroll(() => locomotiveModule.default);
    });
  }, []);

  useEffect(() => {
    if (!LocomotiveScroll) return;

    // Initialize Locomotive Scroll
    scrollInstanceRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.075,
      multiplier: 2,
    });

    return () => {
      scrollInstanceRef.current?.destroy();
    };
  }, [LocomotiveScroll]);

  useEffect(() => {
    if (scrollInstanceRef.current) {
      scrollInstanceRef.current.scrollTo(0, { duration: 0, disableLerp: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Runs whenever route changes

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
