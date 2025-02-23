"use client";

import { motion } from "framer-motion";
import Category from "./Components/Category";
import Celebrate from "./Components/Celebrate";
import Craft from "./Components/Craft";
import FooterBanner from "./Components/FooterBanner";
import Gifting from "./Components/Gifting";
import Hero from "./Components/Hero";
import Mens from "./Components/Mens";
import Ship from "./Components/Ship";
import Spotlight from "./Components/Spotlight";
import ProductList from "./Components/ProductList ";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      {/* Hero Section - Fade In */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Hero />
      </motion.div>

      {/* Sections with Staggered Animations */}
      {[
        Category,
        Mens,
        Craft,
        ProductList,
        Ship,
        Spotlight,
        Gifting,
        Celebrate,
      ].map((Component, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <Component />
        </motion.div>
      ))}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <FooterBanner />
      </motion.div>

    </>
  );
}
