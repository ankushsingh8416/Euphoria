import Category from "./Components/Category";
import Craft from "./Components/Craft";
import Hero from "./Components/Hero";
import Mens from "./Components/Mens";
import ProductList from "./Components/ProductList ";
import Ship from "./Components/Ship";
import Spotlight from "./Components/Spotlight";

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Mens />
      <Craft />
      <ProductList />
      <Ship />
      <Spotlight />
    </>
  );
}
