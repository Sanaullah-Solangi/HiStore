import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mainColor, setMainColor] = useState("#FF4D4F");
  const [bgColor, setBgColor] = useState("white");
  const [color, setColor] = useState("rgb(27,31,35)");
  useEffect(() => {
    // rgb(32,33,36)
    theme == "light" ? setBgColor("white") : setBgColor("rgb(27,31,35)");
    theme == "black" ? setColor("white") : setColor("rgb(27,31,35)");
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, bgColor, color, mainColor, setMainColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeContextProvider;
