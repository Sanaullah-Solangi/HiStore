import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mainColor, setMainColor] = useState("#FF7200");
  const [bgColor, setBgColor] = useState("white");
  const [bgHoverColor, setBgHoverColor] = useState("#e5e7eb");
  const [textColor, setTextColor] = useState("rgb(27,31,35)");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    theme === "light" ? setBgColor("white") : setBgColor("rgb(27,31,35)");
    theme === "light" ? setTextColor("rgb(27,31,35)") : setTextColor("white");
    theme === "light"
      ? setBgHoverColor("rgb(240,240,240)")
      : setBgHoverColor("rgb(37,41,45)");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        bgColor,
        textColor,
        mainColor,
        bgHoverColor,
        setMainColor,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

export function useTheme() {
  return useContext(ThemeContext);
}
