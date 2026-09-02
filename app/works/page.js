"use client";
import { PRODUCTS } from "@/lib/products";
import WorkInspectionPopup from "../components/WorkInspectionPopup";
import CartButton from "../components/CartButton";
import CartDrawer from "../components/CartDrawer";

import { useEffect, useState } from "react";

export default function WorksPage() {
  
  const [selectedWork, setSelectedWork] = useState(null);
  const [inventory, setInventory] = useState({});
  useEffect(() => {
  const loadInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Unable to load inventory.");
      }

      const inventoryMap = {};

      data.forEach((item) => {
        inventoryMap[item.product_id] = item;
      });

      setInventory(inventoryMap);
    } catch (error) {
      console.error("Inventory load error:", error);
    }
  };

  loadInventory();
}, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#EAE3D6] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 pt-10 flex items-center justify-between gap-6">
  <a
    href="/"
    className="inline-flex items-center gap-3 border border-[#BEB5A7] px-6 py-3 rounded-full uppercase tracking-[0.25em] text-[10px] text-[#5B5650] hover:border-[#7A2E2E] hover:text-[#7A2E2E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out"
  >
    ← Return to OSS
  </a>

  <CartButton onClick={() => setIsCartOpen(true)} />
</div>
      {/* HEADER */}
      <section>
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-1">
          <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-6">
            OSS Archive
          </p>

          <h1 className="text-5xl md:text-7xl leading-[0.92] tracking-[-0.04em] font-semibold">
            Archive
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-[#5B5650]">
            A registry of completed textile works, current pieces, and acquired
            artifacts from the OSS archive.
          </p>
        </div>
      </section>

      {/* WORK GRID */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((work) => {
  const stock = inventory[work.id];
  const quantity = stock?.quantity ?? null;

  const liveStatus =
    quantity === 0
      ? "Acquired"
      : quantity > 0
      ? "Available"
      : work.status;

  const liveInventoryType =
    stock?.inventory_type || "unique";

  const liveAvailableQuantity =
    quantity ??
    (work.status.toLowerCase() === "acquired" ? 0 : 1);

  const displayWork = {
    ...work,
    status: liveStatus,
    inventoryType: liveInventoryType,
    availableQuantity: liveAvailableQuantity,
  };

  return (
            <div
              key={work.title}
              className="group bg-[#F4EEE4] border border-[#D6CFC2] rounded-[2rem] overflow-hidden hover:-translate-y-1 transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#DDD4C7]">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
  <p className="uppercase tracking-[0.25em] text-[10px] text-[#7A2E2E] leading-relaxed">
    {work.type}
  </p>

  <span className="text-[9px] uppercase tracking-[0.16em] text-[#8A8074] whitespace-nowrap pt-[2px]">
    {liveStatus}
  </span>
</div>

                <h2 className="text-2xl leading-tight font-semibold">
                  {work.title}
                </h2>
{liveStatus === "Available" && (
  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#7A2E2E]">
    {work.price}
  </p>
)}
                <button
                  onClick={() => setSelectedWork(displayWork)}
                  className="mt-8 border border-[#BEB5A7] px-6 py-3 rounded-full uppercase tracking-[0.25em] text-[11px] hover:border-[#7A2E2E] hover:text-[#7A2E2E] transition-all duration-300"
                >
                  Inspect Work
                </button>
              </div>
            </div>
            );
})}
        </div>
      </section>

     <WorkInspectionPopup
  selectedWork={selectedWork}
  onClose={() => setSelectedWork(null)}
/>
<CartDrawer
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
/>
    </main>
  );
}