"use client";

import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const userData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 600 },
  { month: "Mar", users: 800 },
  { month: "Apr", users: 1000 },
  { month: "May", users: 1200 },
  { month: "Jun", users: 1500 },
];

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 9000 },
  { month: "Apr", revenue: 12000 },
  { month: "May", revenue: 15000 },
  { month: "Jun", revenue: 20000 },
];

const ordersDeliveriesData = [
  { month: "Jan", orders: 100, deliveries: 90 },
  { month: "Feb", orders: 150, deliveries: 140 },
  { month: "Mar", orders: 200, deliveries: 180 },
  { month: "Apr", orders: 250, deliveries: 230 },
  { month: "May", orders: 300, deliveries: 280 },
  { month: "Jun", orders: 350, deliveries: 320 },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Home", value: 100 },
];

const feedbackData = [
  { month: "Jan", satisfaction: 85 },
  { month: "Feb", satisfaction: 88 },
  { month: "Mar", satisfaction: 90 },
  { month: "Apr", satisfaction: 92 },
  { month: "May", satisfaction: 95 },
  { month: "Jun", satisfaction: 98 },
];

export function DashboardCharts() {
  const { textColor, mainColor, secondaryBgColor } = useContext(ThemeContext);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: textColor }}>
          User Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke={mainColor} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: textColor }}>
          Revenue Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Bar dataKey="revenue" fill={mainColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: textColor }}>
          Orders vs Deliveries
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={ordersDeliveriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Bar dataKey="orders" fill={mainColor} />
            <Line type="monotone" dataKey="deliveries" stroke="#10B981" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: textColor }}>
          Product Categories
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={mainColor}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        className="rounded-xl p-4 lg:col-span-2"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: textColor }}>
          Customer Satisfaction Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={feedbackData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="satisfaction"
              fill={`${mainColor}40`}
              stroke={mainColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
