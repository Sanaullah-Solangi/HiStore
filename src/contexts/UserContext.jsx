import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
// ==========================================

export const UserContext = createContext();
function UserContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  console.log("User data in context =>", user);
  useEffect(() => {
    if (token !== null && token !== "null") {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } 
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
