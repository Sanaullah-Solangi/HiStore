import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mainColor, setMainColor] = useState("#FF7200");
  const [bgColor, setBgColor] = useState("white");
  const [bgHoverColor, setBgHoverColor] = useState("#e5e7eb");
  const [color, setColor] = useState("rgb(27,31,35)");
  useEffect(() => {
    // rgb(32,33,36)
    theme == "light" ? setBgColor("white") : setBgColor("rgb(27,31,35)");
    theme == "black" ? setColor("white") : setColor("rgb(27,31,35)");
    theme == "light"
      ? setBgHoverColor("rgb(240,240,240)")
      : setBgHoverColor("rgb(37,41,45)");
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        bgColor,
        color,
        mainColor,
        bgHoverColor,
        setMainColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeContextProvider;
