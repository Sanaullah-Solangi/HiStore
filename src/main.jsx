import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LogoUrlProvider from "./contexts/LogoContext.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeContextProvider from "./contexts/ThemeContext.jsx";
import CartContextProvider from "./contexts/CartContext.jsx";
import AppRouter from "./Router/AppRouter";
import UserContextProvider from "./contexts/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <LogoUrlProvider>
        <ThemeContextProvider>
          <CartContextProvider>
            <AppRouter />
          </CartContextProvider>
        </ThemeContextProvider>
      </LogoUrlProvider>
    </UserContextProvider>
  </StrictMode>
);
