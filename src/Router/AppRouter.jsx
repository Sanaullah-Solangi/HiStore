// HOOKS
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

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
import UserDetails from "../pages/UserDetails";
import Profile from "../components/UserComponents/Profile";
import Orders from "../components/UserComponents/Orders";
import Products from "../components/UserComponents/Products";
import ScrollTop from "../components/GlobalComponents/ScrollTop";
import PicColors from "../components/GlobalComponents/ColorPicker";
import CheckOut from "../components/HomeComponents/CheckOut";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
function AppRouter() {
  const {
    isUser: { isLogIn },
  } = useContext(UserContext);
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
        {/* /USER ROUTES STACK */}
        <Route
          path="/user"
          element={
            <>
              <Header />
              <Navigations />
              <UserDetails />
              <Footer />
            </>
          }
        >
          <Route path="Profile" element={<Profile />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Products" element={<Products />} />
        </Route>
        {/* HOME ROUTES STACK */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Navigations />
              <PicColors />
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
          <Route path="CheckOut" element={<CheckOut />} />
          <Route path="ProductListing/:id" element={<ProductListing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default AppRouter;
