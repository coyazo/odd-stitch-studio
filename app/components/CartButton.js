"use client";

import { useCart } from "./CartProvider";

export default function CartButton({ onClick }) {
  const { cartCount } = useCart();

  return (
    <button
      type="button"
      onClick={onClick}
      className="uppercase tracking-[0.25em] text-[11px] text-[#4D4842] hover:text-[#7A2E2E] transition-colors duration-300 whitespace-nowrap"
    >
      Cart / {cartCount}
    </button>
  );
}