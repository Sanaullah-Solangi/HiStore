import { createContext, useContext, useRef, useState } from "react";
import logo from "../assets/images/darkLogo.png";
import light_logo from "../assets/images/lightLogo.png";
import { UserContext } from "./UserContext";

export const LogoUrl = createContext();
function LogoUrlProvider({ children }) {
  const { isUser } = useContext(UserContext);
  console.log("isUser in LogoContext=>", isUser.user?.photoURL);
  const [profileDp, setProfileDp] = useState(isUser?.user?.photoURL);
  const imgUrl = useRef(logo);
  const lightLogo = useRef(light_logo);
  return isUser?.user?.photoURL ? (
    <LogoUrl.Provider value={{ imgUrl, lightLogo, profileDp, setProfileDp }}>
      {children}
    </LogoUrl.Provider>
  ) : null;
}
export default LogoUrlProvider;
