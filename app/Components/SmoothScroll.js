"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("locomotive-scroll").then((module) => {
        const LocomotiveScroll = module.default;

        if (!locomotiveScrollRef.current) {
          locomotiveScrollRef.current = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            smoothMobile: true,
            multiplier: 5, // ⚡ Faster but smooth
            inertia: 0.1, // ⚡ Balanced for smooth feel
          });

          // ✅ Sync Locomotive Scroll with GSAP ScrollTrigger
          locomotiveScrollRef.current.on("scroll", ScrollTrigger.update);
          ScrollTrigger.scrollerProxy(scrollRef.current, {
            scrollTop(value) {
              return arguments.length
                ? locomotiveScrollRef.current.scrollTo(value, 0, 0)
                : locomotiveScrollRef.current.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
          });

          ScrollTrigger.addEventListener("refresh", () =>
            locomotiveScrollRef.current.update()
          );
          ScrollTrigger.refresh();
        }
      });

      return () => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.destroy();
          locomotiveScrollRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container className="relative">
      {children}
    </div>
  );
};

export default SmoothScroll;
