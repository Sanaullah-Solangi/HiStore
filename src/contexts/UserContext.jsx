import { auth, onAuthStateChanged } from "../utils/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
// ==========================================
export const UserContext = createContext();
// USER CONTEXT PROVIDE
function UserContextProvider({ children }) {
  const [isUser, setIsUser] = useState({ isLogIn: false });
  const [flagToResetCartItems, setFlagToResetCartItems] = useState(true);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser({ user: user, isLogIn: true });
        localStorage.setItem("uid", `cart${user.uid}`);
        localStorage.setItem("email", user.email);
        localStorage.setItem("order", `deliverd${user.uid}`);
      } else {
        setIsUser({ isLogIn: false });
        localStorage.setItem("email", null);
        flagToResetCartItems
          ? setFlagToResetCartItems(false)
          : setFlagToResetCartItems(true);
        console.log("user log in nhi hai");
      }
    });
    return () => {
      subscribe;
    };
  }, []);

  return (
    <UserContext.Provider value={{ isUser, flagToResetCartItems }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
