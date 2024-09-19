import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Hero from "../components/HomeComponents/Hero";
import Header from "../components/GlobalComponents/Header";
import Navigations from "../components/GlobalComponents/Navigations";
import Services from "../components/HomeComponents/Services";
import Footer from "../components/GlobalComponents/Footer";
import Categories from "../components/HomeComponents/Categories";
import FeaturedProds from "../components/HomeComponents/FeaturedProds";
import ProductDetail from "../components/HomeComponents/ProductDetail";
import NotFound from "../components/GlobalComponents/NotFound";
import CartItems from "../components/GlobalComponents/CartItems";
import HomePage from "../pages/Home";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

function AppRouter() {
  const { isUser } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Header />
      <Navigations />
      <Routes>
        <Route
          path="/SignUpPage"
          element={isUser ? <Navigate to={"/"} /> : <SignUpPage />}
        />
        <Route
          path="/LogInPage"
          element={isUser ? <Navigate to={"/"} /> : <LogInPage />}
        />
        <Route
          path="/"
          element={isUser ? <HomePage /> : <Navigate to={"/LogInPage"} />}
        />
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
