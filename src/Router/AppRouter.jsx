// HOOKS
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// PAGES & COMPONENTS
//Auth-Components
import SignUp from "../pages/auth-pages/signup-page/SignUp";
import LogIn from "../pages/auth-pages/login-page/LogIn";
import ForgotPassword from "../pages/auth-pages/forgot-password-page/ForgotPassword";
import VarifyAccount from "../pages/auth-pages/varify-account-page/VarifyAccount";
//Layout-Components
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Navigations from "../components/layout/Navigations";
//Home-Components
import HomePage from "../pages/home-page/Home";
import Hero from "../pages/home-page/home-components/Hero";
import Categories from "../pages/home-page/home-components/Categories";
import Services from "../pages/home-page/home-components/Services";
import FeaturedProducts from "../pages/home-page/home-components/featured-products/FeaturedProducts";
//Cart-Related-Components
import CartItems from "../pages/CartItems";
import CheckOut from "../pages/CheckOut";
import AllProducts from "../pages/all-products-page/AllProducts";
//User-Details
import Profile from "../pages/profile-page/Profile";
import Orders from "../components/UserComponents/Orders";
//Utilities
import ScrollTop from "../components/utils/ScrollTop";
import PicColors from "../components/ui/ColorPicker";
import StatusMessage from "../components/ui/StatusMessage";
//Admin-Components
import AdminLayout from "../pages/AdminLayout";
import AdminProducts from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import UsersPage from "../pages/UsersPage";
import ShoppingCart from "../components/ShoppingCart";
import ProductDetails from "../pages/ProductDetails";
//Contexts
import UserContextProvider from "../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
function AppRouter() {
  const token = localStorage.getItem("token");
  let user;
  if (token !== null && token !== "null") {
    console.log("token", token);
    user = jwtDecode(token);
  }
  console.log("User in router =>", user);
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ScrollTop />
        <PicColors />
        <Routes>
          {/* AUTH ROUTES STACK */}
          <Route
            path="/auth"
            element={
              user ? (
                <Navigate to={"/"} />
              ) : (
                <>
                  <Outlet />
                </>
              )
            }
          >
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="varify-account" element={<VarifyAccount />} />
          </Route>

          {/* ADMIN ROUTES STACK */}
          <Route
            path="/admin"
            element={
              // loggedInUser?.email === "admin@gmail.com" ? (
              <>
                <AdminLayout />
              </>
              // ) : (
              // <Navigate to={"/"} />
              // )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* USER ROUTES STACK */}
          <Route
            path="/user"
            element={
              user ? (
                <>
                  <Header />
                  <Navigations />
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
                <Outlet />
                <Footer />
              </div>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="hero" element={<Hero />} />
            <Route path="services" element={<Services />} />
            <Route path="categories" element={<Categories />} />
            <Route path="featuredproducts" element={<FeaturedProducts />} />
            <Route path="cartitems" element={<CartItems />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="all-products/:searchQuery" element={<AllProducts />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
          </Route>
          {/* NOT FOUND ROUTE */}
          <Route
            path="*"
            element={
              <StatusMessage
                status="404"
                title="404 - Page Not Found"
                subTitle="Sorry, the page you're looking for doesn't exist."
                btnTxt={"Back Home"}
              />
            }
          />
        </Routes>
        {/* <Footer /> */}
      </UserContextProvider>
    </BrowserRouter>
  );
}
export default AppRouter;
