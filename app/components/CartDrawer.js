"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

export default function CartDrawer({ isOpen, onClose }) {
  const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  cartCount,
  cartTotal,
} = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to start checkout. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999]">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-[#111111]/45 backdrop-blur-sm"
      />

      {/* DRAWER */}
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[460px] bg-[#F4EEE4] border-l border-[#D6CFC2] shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="px-6 md:px-8 py-6 border-b border-[#D6CFC2] flex items-start justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.35em] text-[9px] text-[#7A2E2E] mb-2">
              OSS / Acquisition Register
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#7A2E2E] text-[#7A2E2E] flex items-center justify-center text-xl hover:bg-[#7A2E2E] hover:text-[#F4EEE4] transition-all duration-300"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <p className="uppercase tracking-[0.3em] text-[10px] text-[#7A2E2E]">
                Register Empty
              </p>

              <p className="mt-5 text-sm leading-relaxed text-[#5B5650]">
                No works have been added to the acquisition register.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-8 border border-[#BEB5A7] px-6 py-3 rounded-full uppercase tracking-[0.25em] text-[10px] text-[#5B5650] hover:border-[#7A2E2E] hover:text-[#7A2E2E] transition-all duration-300"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#D6CFC2] pb-6"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-24 shrink-0 overflow-hidden rounded-xl bg-[#DDD4C7] border border-[#D6CFC2]">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold leading-tight">
                        {item.title || item.name}
                      </p>
                      {item.inventoryType === "limited" && (
  <div className="mt-4">
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => decreaseQuantity(item.id)}
        aria-label={`Decrease quantity of ${item.title || item.name}`}
        className="w-7 h-7 rounded-full border border-[#BEB5A7] flex items-center justify-center text-sm text-[#5B5650] hover:border-[#7A2E2E] hover:text-[#7A2E2E] transition-all duration-300"
      >
        −
      </button>

      <span className="min-w-5 text-center text-sm font-semibold text-[#111111]">
        {item.quantity}
      </span>

      <button
        type="button"
        onClick={() => increaseQuantity(item.id)}
        disabled={item.quantity >= item.availableQuantity}
        aria-label={`Increase quantity of ${item.title || item.name}`}
        className="w-7 h-7 rounded-full border border-[#BEB5A7] flex items-center justify-center text-sm text-[#5B5650] hover:border-[#7A2E2E] hover:text-[#7A2E2E] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#BEB5A7] disabled:hover:text-[#5B5650] transition-all duration-300"
      >
        +
      </button>

      <span className="ml-1 uppercase tracking-[0.18em] text-[8px] text-[#8A8074]">
        {item.availableQuantity} Available
      </span>
    </div>
  </div>
)}

                      <p className="mt-2 uppercase tracking-[0.18em] text-[8px] text-[#8A8074]">
                        {item.type}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="text-sm text-[#7A2E2E]">
                          {item.price}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="uppercase tracking-[0.22em] text-[8px] text-[#6B655E] hover:text-[#7A2E2E] transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t border-[#D6CFC2] px-6 md:px-8 py-6 bg-[#EAE3D6]">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#6B655E]">
              <span>
                {cartCount} {cartCount === 1 ? "Work" : "Works"}
              </span>

              <span>
                Total
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-[#5B5650]">
                Acquisition Total
              </span>

              <span className="text-xl font-semibold">
                ${(cartTotal / 100).toFixed(2)}
              </span>
            </div>

            <button
  type="button"
  onClick={handleCheckout}
  className="mt-6 w-full bg-[#111111] text-[#EAE3D6] px-6 py-4 rounded-full uppercase tracking-[0.25em] text-[10px] hover:bg-[#7A2E2E] transition-all duration-300"
>
  Proceed to Acquire
</button>

            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="uppercase tracking-[0.22em] text-[8px] text-[#6B655E] hover:text-[#7A2E2E]"
              >
                Continue Browsing
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="uppercase tracking-[0.22em] text-[8px] text-[#6B655E] hover:text-[#7A2E2E]"
              >
                Clear Register
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}