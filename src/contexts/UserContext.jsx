import { auth, onAuthStateChanged } from "../utils/firebase";
import { createContext, useEffect, useState } from "react";
// ==========================================
export const UserContext = createContext();
// USER CONTEXT PROVIDE
function UserContextProvider({ children }) {
  const [isUser, setIsUser] = useState({ isLogIn: false });
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser({ user: user, isLogIn: true });
      } else {
        setIsUser({ isLogIn: false });
        console.log("user log in nhi hai");
      }
    });

    return () => {
      subscribe;
    };
  }, []);

  return (
    <UserContext.Provider value={{ isUser }}>{children}</UserContext.Provider>
  );
}
export default UserContextProvider;
