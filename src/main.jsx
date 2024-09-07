import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./assets/Router/AppRouter.jsx";
import LogoUrlProvider from "./assets/contexts/LogoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LogoUrlProvider>
      <AppRouter />
    </LogoUrlProvider>
  </StrictMode>
);
