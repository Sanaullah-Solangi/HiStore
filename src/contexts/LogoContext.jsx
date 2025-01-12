import { createContext, useRef } from "react";
import logo from "../assets/images/darkLogo.png";
import light_logo from "../assets/images/lightLogo.png";

export const LogoUrl = createContext();
function LogoUrlProvider({ children }) {
  const imgUrl = useRef(logo);
  const lightLogo = useRef(light_logo);
  return (
    <LogoUrl.Provider value={{ imgUrl, lightLogo }}>
      {children}
    </LogoUrl.Provider>
  );
}
export default LogoUrlProvider;
