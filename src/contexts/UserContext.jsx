import { auth, onAuthStateChanged } from "../utils/firebase";
import { createContext, useEffect, useState } from "react";
// ==========================================
export const UserContext = createContext();
// USER CONTEXT PROVIDE
function UserContextProvider({ children }) {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
        console.log("user log in nhi hai");
      }
    });

    return () => {
      subscribe;
    };
  }, []);
  // console.log("isUser=>", isUser);

  return (
    <UserContext.Provider value={{ isUser }}>{children}</UserContext.Provider>
  );
}
export default UserContextProvider;
