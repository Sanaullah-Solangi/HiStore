// CONTEXTS
import LogoUrlProvider from "./contexts/LogoContext.jsx";
import ThemeContextProvider from "./contexts/ThemeContext.jsx";
import CartContextProvider from "./contexts/CartContext.jsx";
// OTHERS
import AppRouter from "./Router/AppRouter";
import { Bounce, ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/responsive.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoaderContextProvider from "./contexts/LoaderContext.jsx";
import UserContextProvider from "./contexts/UserContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <LoaderContextProvider>
          <LogoUrlProvider>
            <ThemeContextProvider>
              <CartContextProvider>
                <AppRouter />
              </CartContextProvider>
            </ThemeContextProvider>
          </LogoUrlProvider>
        </LoaderContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      className={"toastBody"}
    />
  </StrictMode>
);
