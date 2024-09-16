import Hero from "../../components/HomeComponents/Hero";
import Services from "../../components/HomeComponents/Services";
import Categories from "../../components/HomeComponents/Categories";
import FeaturedProds from "../../components/HomeComponents/FeaturedProds";
import ProductDetail from "../../components/HomeComponents/ProductDetail";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Categories />
      <FeaturedProds />
    </>
  );
}

export default HomePage;
