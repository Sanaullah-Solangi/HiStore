"use client";

import { useContext } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "antd";
const menuItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/profile", icon: User, label: "Profile" },
  { path: "/admin/users", icon: Users, label: "Users" },
  { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { path: "/admin/products", icon: Package, label: "Products" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const { theme, bgColor, textColor, mainColor, sidebarOpen, toggleSidebar } =
    useContext(ThemeContext);
  console.log("toggleSidebar =>", toggleSidebar);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-[100]  flex w-72 flex-col border-r transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
        style={{ backgroundColor: bgColor, borderColor: `${mainColor}20` }}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <img
            src={
              theme === "light"
                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/darkLogo-ccjuoG902U129EUVMx8XXHRIxcNVDh.png"
                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lightLogo-T3r1nAPlaSWEot79v3dQPiTTZSvc52.png"
            }
            alt="HiStore Logo"
            className="h-8"
          />
          <Button
            variant="outline"
            size="middle"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <span className="sr-only">Toggle Sidebar</span>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: isActive ? mainColor : "transparent",
                  color: isActive ? "#fff" : textColor,
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4" style={{ borderColor: `${mainColor}20` }}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-500/10">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
