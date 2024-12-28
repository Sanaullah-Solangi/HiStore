import { auth, db, doc, getDoc, onAuthStateChanged } from "../utils/firebase";
import { createContext, useEffect, useState } from "react";
// ==========================================
export const UserContext = createContext();
// USER CONTEXT PROVIDE
function UserContextProvider({ children }) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [isUser, setIsUser] = useState(loggedInUser);
  console.log("IS USER IN USERCONTEXT", isUser);
  console.log("loggedUser IN USERCONTEXT", loggedInUser);
  const [flagToResetCartItems, setFlagToResetCartItems] = useState(true);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "Users", user.uid);
        const userData = (await getDoc(ref)).data();
        const camparison = user?.email == loggedInUser?.email;

        const obj = {
          ...userData,
          isLogIn: true,
        };
        console.log("LOGGED USER IN USERCONTEXT IN IF=>", user);
        setIsUser(obj);
        localStorage.setItem("loggedInUser", JSON.stringify(obj));
        localStorage.setItem("order", `deliverd${user.uid}`);
      } else {
        flagToResetCartItems
          ? setFlagToResetCartItems(false)
          : setFlagToResetCartItems(true);
        console.log("user log in nhi hai");
        console.log("LOGGED USER IN USERCONTEXT IN ELSE=>", loggedInUser);
      }
    });
    return () => {
      subscribe;
    };
  }, []);

  return (
    <UserContext.Provider value={{ isUser, setIsUser, flagToResetCartItems }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
