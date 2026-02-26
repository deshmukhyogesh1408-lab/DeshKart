"use client";

import Link from "next/link";
import { Package, Clock, ShoppingBag } from "lucide-react";

// Simulated orders
const demoOrders = [
  {
    id: "ORD-M3K7X2P",
    date: "Feb 25, 2026",
    total: 1349.98,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-N8R2J5Q",
    date: "Feb 20, 2026",
    total: 449.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-P4T6W9V",
    date: "Feb 15, 2026",
    total: 89.98,
    status: "Processing",
    items: 3,
  },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-success/10 text-success",
  Shipped: "bg-accent/10 text-accent",
  Processing: "bg-secondary/10 text-secondary",
  Pending: "bg-muted text-muted-foreground",
  Cancelled: "bg-danger/10 text-danger",
};

export default function OrdersPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">
          Track and manage your recent orders
        </p>

        {demoOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t placed any orders yet. Start shopping!
            </p>
            <Link
              href="/products"
              className="inline-flex px-6 py-3 bg-primary text-white rounded-xl font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {demoOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm font-semibold">
                        {order.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {order.date}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status] || statusColors.Pending
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {order.items} item{order.items !== 1 ? "s" : ""}
                  </span>
                  <span className="font-bold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
