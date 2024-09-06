import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../../components/Hero";
import Header from "../../components/Header";
import Navigations from "../../components/Navigations";
import Services from "../../components/Services";
import Footer from "../../components/Footer";
import Catogaries from "../../components/Catogaries";
import FeaturedProds from "../../components/FeaturedProds";
import ProductDetail from "../../components/ProductDetail";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Navigations />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/services" element={<Services />} />
        <Route path="/catogaries" element={<Catogaries />} />
        <Route path="/FeaturedProds" element={<FeaturedProds />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default AppRouter;
