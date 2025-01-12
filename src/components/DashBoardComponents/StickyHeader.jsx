"use client";

import { useContext } from "react";
import { Moon, Sun, Menu } from "lucide-react";
// import { Sidebar } from "../components/DashBoardComponents/Sidebar";
// import { SummaryCards } from "../components/DashBoardComponents/SummaryCards";
// import { DashboardCharts } from "../components/DashBoardComponents/DashBoardCharts";
import { Button } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
function StickyHeader() {
  const {
    theme,
    toggleTheme,
    bgColor,
    setTheme,
    textColor,
    sidebarOpen,
    toggleSidebar,
  } = useContext(ThemeContext);
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between border-b p-4"
      style={{ backgroundColor: bgColor, borderColor: `${textColor}20` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <span className="sr-only">Toggle Sidebar</span>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="h-10 w-10"
      >
        {theme === "light" ? (
          <Moon
            className="h-7 w-7"
            onClick={() => {
              setTheme("black");
            }}
          />
        ) : (
          <Sun
            className="h-7 w-7"
            onClick={() => {
              setTheme("light");
            }}
          />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
export default StickyHeader;
