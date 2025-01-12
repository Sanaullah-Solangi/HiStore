"use client";

import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Users,
  ShoppingBag,
  Truck,
  DollarSign,
  Clock,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

const summaryData = [
  { title: "Total Users", value: "1,234", icon: Users, trend: "+12%" },
  { title: "Total Orders", value: "856", icon: ShoppingBag, trend: "+23%" },
  { title: "Total Deliveries", value: "752", icon: Truck, trend: "+18%" },
  { title: "Total Revenue", value: "$45,678", icon: DollarSign, trend: "+28%" },
  { title: "Pending Orders", value: "43", icon: Clock, trend: "-8%" },
  { title: "Stock Alerts", value: "12", icon: AlertTriangle, trend: "-15%" },
  {
    title: "Customer Feedback",
    value: "4.8/5",
    icon: MessageSquare,
    trend: "+5%",
  },
];

export function SummaryCards() {
  const { bgColor, textColor, mainColor, secondaryBgColor } =
    useContext(ThemeContext);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <div
          key={item.title}
          className="rounded-xl p-4 transition-shadow hover:shadow-lg"
          style={{ backgroundColor: secondaryBgColor }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: textColor }}>
                {item.title}
              </p>
              <h3 className="text-2xl font-bold" style={{ color: textColor }}>
                {item.value}
              </h3>
            </div>
            <div
              className="rounded-full p-2"
              style={{ backgroundColor: `${mainColor}20`, color: mainColor }}
            >
              <item.icon className="h-6 w-6" />
            </div>
          </div>
          <p
            className="mt-2 text-sm"
            style={{
              color: item.trend.startsWith("+")
                ? "rgb(34, 197, 94)"
                : "rgb(239, 68, 68)",
            }}
          >
            {item.trend} this month
          </p>
        </div>
      ))}
    </div>
  );
}
