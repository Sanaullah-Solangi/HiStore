import { createContext, useContext, useRef, useState } from "react";
import logo from "../assets/images/darkLogo.png";
import light_logo from "../assets/images/lightLogo.png";
import { UserContext } from "./UserContext";

export const LogoUrl = createContext();
function LogoUrlProvider({ children }) {
  const { isUser } = useContext(UserContext);
  const [profileDp, setProfileDp] = useState(
    isUser?.isLogIn ? isUser?.user?.photoURL : null
  );
  // if (isUser?.isLogIn) {
  //   setProfileDp(isUser?.user?.photoURL);
  // }
  const imgUrl = useRef(logo);
  const lightLogo = useRef(light_logo);
  return (
    <LogoUrl.Provider value={{ imgUrl, lightLogo, profileDp, setProfileDp }}>
      {children}
    </LogoUrl.Provider>
  );
}
export default LogoUrlProvider;
