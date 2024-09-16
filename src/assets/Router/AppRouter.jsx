import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../../components/HomeComponents/Hero";
import Header from "../../components/GlobalComponents/Header";
import Navigations from "../../components/GlobalComponents/Navigations";
import Services from "../../components/HomeComponents/Services";
import Footer from "../../components/GlobalComponents/Footer";
import Categories from "../../components/HomeComponents/Categories";
import FeaturedProds from "../../components/HomeComponents/FeaturedProds";
import ProductDetail from "../../components/HomeComponents/ProductDetail";
import NotFound from "../../components/GlobalComponents/NotFound";
import HomePage from "../pages/Home";
import CartItems from "../../components/GlobalComponents/CartItems";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Navigations />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/services" element={<Services />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/FeaturedProds" element={<FeaturedProds />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/CartItems" element={<CartItems />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default AppRouter;
