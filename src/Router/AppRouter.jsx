// HOOKS
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

// PAGES & COMPONENTS
import Hero from "../components/HomeComponents/Hero";
import Header from "../components/GlobalComponents/Header";
import Navigations from "../components/GlobalComponents/Navigations";
import Services from "../components/HomeComponents/Services";
import Footer from "../components/GlobalComponents/Footer";
import Categories from "../components/HomeComponents/Categories";
import FeaturedProds from "../components/HomeComponents/FeaturedProds";
import NotFound from "../components/GlobalComponents/NotFound";
import CartItems from "../components/GlobalComponents/CartItems";
import HomePage from "../pages/Home";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import ProductListing from "../components/HomeComponents/ProductListing";
import ScrollTop from "../components/GlobalComponents/ScrollTop";

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* AUTH ROUTES STACK */}
        <Route
          path="/auth"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path="SignUpPage" element={<SignUpPage />} />
          <Route path="LogInPage" element={<LogInPage />} />
        </Route>
        {/* HOME ROUTES STACK */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Navigations />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="hero" element={<Hero />} />
          <Route path="services" element={<Services />} />
          <Route path="categories" element={<Categories />} />
          <Route path="FeaturedProds" element={<FeaturedProds />} />
          <Route path="CartItems" element={<CartItems />} />
          <Route path="ProductListing/:id" element={<ProductListing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default AppRouter;
