import Hero from "../home-page/home-components/Hero";
import Services from "../home-page/home-components/Services";
import Categories from "../home-page/home-components/Categories";
import FeaturedProducts from "./home-components/featured-products/FeaturedProducts";
function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Categories />
      <FeaturedProducts />
    </>
  );
}

export default HomePage;
