"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const pathname = usePathname();
  const [LocomotiveScroll, setLocomotiveScroll] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("locomotive-scroll").then((locomotiveModule) => {
      setLocomotiveScroll(() => locomotiveModule.default);
    });
  }, []);

  useEffect(() => {
    if (!LocomotiveScroll || pathname !== "/") return;

    const scrollInstance = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.75,
      multiplier: 3,
    });

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, [LocomotiveScroll, pathname]);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;
