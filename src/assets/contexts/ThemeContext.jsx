import { createContext, useState } from "react";

export const ThemeContext = createContext();
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("black");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeContextProvider;
