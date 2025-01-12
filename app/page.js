import Category from "./Components/Category";
import Celebrate from "./Components/Celebrate";
import Craft from "./Components/Craft";
import FooterBanner from "./Components/FooterBanner";
import Gifting from "./Components/Gifting";
import Hero from "./Components/Hero";
import Mens from "./Components/Mens";
import ProductList from "./Components/ProductList ";
import SearchPanel from "./Components/SearchPannel";
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
      <Gifting />
      <Celebrate />
      <FooterBanner />
      <SearchPanel />
    </>
  );
}
