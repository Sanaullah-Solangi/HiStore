import { createContext, useRef } from "react";

export const LogoUrl = createContext();
function LogoUrlProvider({ children }) {
  const imgUrl = useRef(
    "http://ps.magentech.com/themes/sp_histore/img/logo.png"
  );
  return <LogoUrl.Provider value={{ imgUrl }}>{children}</LogoUrl.Provider>;
}
export default LogoUrlProvider;
