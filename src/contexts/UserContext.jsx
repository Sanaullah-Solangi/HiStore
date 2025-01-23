import { useNavigate } from "react-router-dom";
import {
  addUserToDB,
  auth,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
} from "../utils/firebase";
import { createContext, useEffect, useState } from "react";
// ==========================================
export const UserContext = createContext();
// USER CONTEXT PROVIDE
function UserContextProvider({ children }) {
  const [loader, setLoader] = useState(false);
  // setLoader(true);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [isUser, setIsUser] = useState(loggedInUser);
  const [flagToResetCartItems, setFlagToResetCartItems] = useState(true);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        const username = localStorage.getItem("username");
        const docRef = doc(db, "Users", user.uid);
        const collectionRef = collection(db, "Users");
        let usersDataFromDB = await getDocs(collectionRef);
        usersDataFromDB = usersDataFromDB.docs.map((doc) => {
          return doc.data();
        });
        console.log(
          "USERDATA FROM DB=>",
          Boolean(usersDataFromDB),
          usersDataFromDB
        );

        let currentUser = usersDataFromDB.findIndex(
          (data) => data.email == user.email
        );
        console.log("currentUser =>", currentUser);
        let obj = {};

        if (currentUser == -1) {
          const userData = await addUserToDB(username, user, docRef, navigate);
          obj = { isLogIn: true, ...userData };
          localStorage.setItem("username", null);
        } else {
          obj = {
            ...usersDataFromDB[currentUser],
            isLogIn: true,
          };
        }
        setIsUser(obj);
        localStorage.setItem("loggedInUser", JSON.stringify(obj));
        localStorage.setItem("userCart", obj?.userCart);
        localStorage.setItem("order", `deliverd${user.uid}`);
      } else {
        localStorage.setItem("userCart", null);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ isLogIn: false })
        );
        localStorage.setItem("order", null);

        // flagToResetCartItems
        //   ? setFlagToResetCartItems(false)
        //   : setFlagToResetCartItems(true);
        console.log("user log in nhi hai");
        // console.log("USERDATA IN USERCONTEXT=>", loggedInUser);
      }
      setLoader(false);
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
