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
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
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
import AdminLayout from "../pages/AdminLayout";
import Users from "../pages/Users";
import AdminProducts from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import AdminOrders from "../pages/Orders";
function AppRouter() {
  const { isUser } = useContext(UserContext);
  const userEmail = localStorage.getItem("email");
  console.log("AppRouter=>", isUser);
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* AUTH ROUTES STACK */}
        <Route
          path="/auth"
          element={
            <>
              <PicColors />
              <Outlet />
            </>
          }
        >
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
        </Route>

        {/* ADMIN ROUTES STACK */}
        <Route
          path="/admin"
          element={
            userEmail == "admin@gmail.com" ? (
              <>
                <Header />
                <Navigations />
                <PicColors />
                <AdminLayout />
              </>
            ) : (
              <Navigate to={"/"} />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        {/* USER ROUTES STACK */}
        <Route
          path="/user"
          element={
            isUser?.isLogIn ? (
              <>
                <Header />
                <Navigations />
                <PicColors />
                <Outlet />
              </>
            ) : (
              <Navigate to={"/"} />
            )
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
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
          <Route path="featuredproducts" element={<FeaturedProds />} />
          <Route path="cartitems" element={<CartItems />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route
            path="productlisting/:searchQuery"
            element={<ProductListing />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default AppRouter;
