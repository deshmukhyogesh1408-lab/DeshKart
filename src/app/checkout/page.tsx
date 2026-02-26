"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  Lock,
  Check,
  ChevronLeft,
  Truck,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { formatPrice, cn } from "@/lib/utils";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShipping, getTax, getTotal, clearCart } =
    useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);

  // Form fields
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [orderId, setOrderId] = useState("");

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const steps = [
    { id: "shipping" as Step, label: "Shipping" },
    { id: "payment" as Step, label: "Payment" },
    { id: "confirmation" as Step, label: "Confirmation" },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));

    const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    clearCart();
    setCurrentStep("confirmation");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subtotal = getSubtotal();
  const shippingCost = getShipping();
  const tax = getTax();
  const total = getTotal();

  return (
    <div className="container-custom py-8">
      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {steps.map((step, i) => {
          const stepIndex = steps.findIndex((s) => s.id === currentStep);
          const isActive = step.id === currentStep;
          const isCompleted = i < stepIndex;

          return (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                    isCompleted
                      ? "bg-success text-white"
                      : isActive
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:inline",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 sm:w-24 h-0.5",
                    i < stepIndex ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation */}
      {currentStep === "confirmation" && (
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-sm font-mono bg-muted px-4 py-2 rounded-lg inline-block mb-8">
            Order ID: {orderId}
          </p>

          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold">Estimated Delivery</p>
                <p className="text-xs text-muted-foreground">
                  3-5 business days
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-foreground">
                {shipping.email || "your email"}
              </span>
              . You can track your order using the order ID above.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      )}

      {/* Shipping & Payment forms */}
      {currentStep !== "confirmation" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form section */}
          <div className="lg:col-span-2">
            {!isAuthenticated && (
              <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm">
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>{" "}
                for a faster checkout experience or continue as a guest.
              </div>
            )}

            {/* Shipping form */}
            {currentStep === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="animate-fade-in">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      First Name
                    </label>
                    <input
                      required
                      value={shipping.firstName}
                      onChange={(e) =>
                        setShipping({ ...shipping, firstName: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      Last Name
                    </label>
                    <input
                      required
                      value={shipping.lastName}
                      onChange={(e) =>
                        setShipping({ ...shipping, lastName: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={shipping.email}
                      onChange={(e) =>
                        setShipping({ ...shipping, email: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({ ...shipping, phone: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium block mb-1.5">
                    Street Address
                  </label>
                  <input
                    required
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      City
                    </label>
                    <input
                      required
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      State
                    </label>
                    <input
                      required
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({ ...shipping, state: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      required
                      value={shipping.zipCode}
                      onChange={(e) =>
                        setShipping({ ...shipping, zipCode: e.target.value })
                      }
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-all"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* Payment form */}
            {currentStep === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="animate-fade-in">
                <button
                  type="button"
                  onClick={() => setCurrentStep("shipping")}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Shipping
                </button>

                <h2 className="text-xl font-bold mb-6">Payment Details</h2>

                <div className="mb-4">
                  <label className="text-sm font-medium block mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      required
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cardNumber: e.target.value
                            .replace(/\D/g, "")
                            .replace(/(\d{4})/g, "$1 ")
                            .trim()
                            .slice(0, 19),
                        })
                      }
                      className="w-full h-11 pl-11 pr-4 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium block mb-1.5">
                    Name on Card
                  </label>
                  <input
                    required
                    placeholder="John Doe"
                    value={payment.cardName}
                    onChange={(e) =>
                      setPayment({ ...payment, cardName: e.target.value })
                    }
                    className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      required
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
                        setPayment({ ...payment, expiry: val });
                      }}
                      maxLength={5}
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">
                      CVV
                    </label>
                    <input
                      required
                      type="password"
                      placeholder="•••"
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })
                      }
                      maxLength={4}
                      className="w-full h-11 px-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full h-12 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
                  )}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay {formatPrice(total)}
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Your payment info is encrypted and secure
                </p>
              </form>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[160px] bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              {/* Items preview */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-white text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-bold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
