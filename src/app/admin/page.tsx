"use client";

import Link from "next/link";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { products, categories } from "@/lib/products-data";

export default function AdminPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,295.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-success/10 text-success",
    },
    {
      title: "Total Orders",
      value: "356",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Products",
      value: products.length.toString(),
      change: "+3",
      trend: "up",
      icon: Package,
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Customers",
      value: "2,847",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      color: "bg-accent/10 text-accent",
    },
  ];

  const recentOrders = [
    { id: "ORD-M3K7X2P", customer: "Sarah Johnson", total: 999.99, status: "Delivered" },
    { id: "ORD-N8R2J5Q", customer: "Mike Chen", total: 349.99, status: "Shipped" },
    { id: "ORD-P4T6W9V", customer: "Emily Davis", total: 599.99, status: "Processing" },
    { id: "ORD-Q7L1Y8T", customer: "James Wilson", total: 179.99, status: "Pending" },
    { id: "ORD-R2H5U3M", customer: "Lisa Brown", total: 1249.99, status: "Delivered" },
  ];

  const statusColors: Record<string, string> = {
    Delivered: "bg-success/10 text-success",
    Shipped: "bg-accent/10 text-accent",
    Processing: "bg-secondary/10 text-secondary",
    Pending: "bg-muted text-muted-foreground",
  };

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Manage Products
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold ${
                  stat.trend === "up" ? "text-success" : "text-danger"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-primary font-medium hover:text-primary-hover"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                    Total
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 text-sm font-mono font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 text-sm">{order.customer}</td>
                    <td className="py-3 text-sm font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top categories */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Top Categories</h2>
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {categories.slice(0, 5).map((cat, i) => {
              const percentage = [85, 72, 64, 45, 38][i];
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-muted-foreground">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">
                <span className="text-success font-semibold">+12.5%</span>{" "}
                revenue increase this month
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
