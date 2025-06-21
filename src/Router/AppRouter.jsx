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
//Home-Components
import HomePage from "../pages/home-page/Home";
import Hero from "../pages/home-page/home-components/Hero";
import Categories from "../pages/home-page/home-components/Categories";
import FeaturedProducts from "../pages/home-page/home-components/featured-products/FeaturedProducts";
import Services from "../pages/home-page/home-components/Services";
//All-Products
import AllProducts from "../pages/all-products-page/AllProducts";
import Header from "../components/layout/Header";
import Navigations from "../components/layout/Navigations";
import Footer from "../components/layout/Footer";
import CartItems from "../pages/CartItems";
import SignUp from "../pages/auth-pages/signup-page/SignUp";
import LogIn from "../pages/auth-pages/login-page/LogIn";
import ForgotPassword from "../pages/auth-pages/forgot-password-page/ForgotPassword";
import Profile from "../pages/profile-page/Profile";
import Orders from "../components/UserComponents/Orders";
// UTILITIES
import ScrollTop from "../utils/ScrollTop";
import PicColors from "../components/ui/ColorPicker";
import CheckOut from "../pages/CheckOut";
import StatusMessage from "../components/ui/StatusMessage";
import AdminLayout from "../pages/AdminLayout";
import AdminProducts from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import AdminOrders from "../pages/Orders";
import UsersPage from "../pages/UsersPage";
import ShoppingCart from "../components/ShoppingCart";
import ProductDetails from "../pages/ProductDetails";
import UserContextProvider, { UserContext } from "../contexts/UserContext";
function AppRouter() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("LOGGED IN USER =>", !loggedInUser?.isLogIn);
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ScrollTop />
        <Routes>
          {/* AUTH ROUTES STACK */}
          <Route
            path="/auth"
            element={
              !loggedInUser?.isLogIn ? (
                <Navigate to={"/"} />
              ) : (
                <>
                  <PicColors />
                  <Outlet />
                </>
              )
            }
          >
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
          </Route>

          {/* ADMIN ROUTES STACK */}
          <Route
            path="https://histore-admin-panel.vercel.app/"
            element={
              loggedInUser?.email === "admin@gmail.com" ? (
                <>
                  <AdminLayout />
                </>
              ) : (
                <Navigate to={"/"} />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          {/* USER ROUTES STACK */}
          <Route
            path="/user"
            element={
              loggedInUser?.isLogIn ? (
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
            <Route path="featuredproducts" element={<FeaturedProducts />} />
            <Route path="cartitems" element={<CartItems />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="all-products/:searchQuery" element={<AllProducts />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
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
          </Route>
        </Routes>
        {/* <Footer /> */}
      </UserContextProvider>
    </BrowserRouter>
  );
}
export default AppRouter;
