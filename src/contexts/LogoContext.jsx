import { createContext, useRef } from "react";
import logo from "../assets/images/logo.png";

export const LogoUrl = createContext();
function LogoUrlProvider({ children }) {
  const imgUrl = useRef(logo);
  return <LogoUrl.Provider value={{ imgUrl }}>{children}</LogoUrl.Provider>;
}
export default LogoUrlProvider;
