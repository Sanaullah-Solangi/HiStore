"use client";

import { useContext } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Sidebar } from "../components/DashBoardComponents/Sidebar";
import { SummaryCards } from "../components/DashBoardComponents/SummaryCards";
import DashboardCharts from "../components/DashBoardComponents/DashBoardCharts";
import { Button } from "antd";
import { ThemeContext } from "../contexts/ThemeContext";
import StickyHeader from "../components/DashBoardComponents/StickyHeader";
export default function Dashboard() {
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
    <main
      className="flex-1 overflow-auto transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <StickyHeader />

      <div className="p-8">
        <SummaryCards />
        <DashboardCharts />
      </div>
    </main>
  );
}
