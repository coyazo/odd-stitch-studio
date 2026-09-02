"use client";
import {
  WONDERLAND_PRODUCTS,
  HALLOWEEN_PRODUCTS,
} from "@/lib/products";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";
import { useEffect, useState } from "react";
import WorkInspectionPopup from "./components/WorkInspectionPopup";
import { useCart } from "./components/CartProvider";
export default function OSSWebsite() {
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inventory, setInventory] = useState<Record<string, any>>({});
  const { clearCart } = useCart() as {
  clearCart: () => void;
};
  const [acquisitionConfirmed, setAcquisitionConfirmed] = useState(false);
   
const process = [
  { title: "Textile Exploration", href: "/studio/textiles" },
  { title: "Pattern Drafting", href: "/studio/patterns" },
  { title: "Quilting & Construction", href: "/studio/construction" },
  { title: "Archive", href: "/works" }
];
  const FEATURED_HALLOWEEN_PRODUCTS = HALLOWEEN_PRODUCTS.filter(
    (product) => product.featured
  );


 useEffect(() => {
  const verifyCheckout = async () => {
    const params = new URLSearchParams(window.location.search);

    const checkout = params.get("checkout");
    const sessionId = params.get("session_id");

    if (checkout !== "success" || !sessionId) {
      return;
    }

    try {
      const response = await fetch(
        `/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`
      );

      const data = await response.json();

     if (response.ok && data.paid) {
  clearCart();
  setAcquisitionConfirmed(true);

  window.history.replaceState(
    {},
    "",
    window.location.pathname
  );
}
    } catch (error) {
      console.error("Checkout verification error:", error);
    }
  };

  verifyCheckout();
}, [clearCart]);
useEffect(() => {
  const loadInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Unable to load inventory.");
      }

      const inventoryMap: Record<string, any> = {};

      data.forEach((item: any) => {
        inventoryMap[item.product_id] = item;
      });

      setInventory(inventoryMap);
    } catch (error) {
      console.error("Inventory load error:", error);
    }
  };

  loadInventory();
}, []);
 return (
    <div className="min-h-screen bg-[#EAE3D6] text-[#111111] font-['IBM_Plex_Mono'] overflow-x-hidden">
     {/* NAVIGATION */}
<header className="sticky top-0 z-50 border-b border-[#D6CFC2] backdrop-blur bg-[#EAE3D6]/90">
  <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    
    <div>
      <h1 className="text-2xl tracking-[0.45em] font-bold text-[#111111]">
        OSS
      </h1>

      <p className="text-[10px] uppercase tracking-[0.35em] text-[#6B655E] mt-1">
        Odd Stitch Studio — Art, Made to Carry
      </p>
    </div>

    <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] text-[#4D4842]">
      <a
        href="#collection"
        className="hover:text-[#9E2A2B] transition-colors duration-300"
      >
        Collection
      </a>

      <a
        href="#about"
        className="hover:text-[#9E2A2B] transition-colors duration-300"
      >
        Philosophy
      </a>

      <a
        href="#process"
        className="hover:text-[#9E2A2B] transition-colors duration-300"
      >
        Process
      </a>

      <a
        href="#contact"
        className="hover:text-[#9E2A2B] transition-colors duration-300"
      >
        Registry
      </a>
    </nav>

    <div className="flex items-center gap-6">
      <CartButton onClick={() => setIsCartOpen(true)} />

      <a
        href="/works"
        className="bg-[#111111] text-[#EAE3D6] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] shadow-md hover:-translate-y-1 hover:scale-[1.015] hover:shadow-2xl hover:bg-[#7A2E2E] transition-all duration-300 ease-out"
      >
        Archive
      </a>
    </div>

  </div>
</header>
          {/* HALLOWEEN 2026 HERO */}
      <section className="relative overflow-hidden border-b border-[#D6CFC2] bg-[#EAE3D6]">
        
        {/* SUBTLE BACKGROUND MARKS */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full border-[70px] border-[#D96C9C]" />
          <div className="absolute -bottom-48 left-[28%] w-[480px] h-[480px] rounded-full border-[55px] border-[#3F9B9B]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">

          {/* TEXT */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="h-[7px] w-[7px] rounded-full bg-[#D96C9C]" />
              <p className="uppercase tracking-[0.42em] text-[#7A2E2E] text-[10px] md:text-xs">
                Currently in the Studio
              </p>
              <span className="h-[7px] w-[7px] rounded-full bg-[#3F9B9B]" />
            </div>

            <p className="uppercase tracking-[0.5em] text-[#6B655E] text-[10px] mb-5">
              Halloween / 2026
            </p>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.88] tracking-[-0.055em] font-semibold text-[#111111]">
              Something
              <br />
              Wickedly
              <br />
              <span className="text-[#D15C91]">Odd.</span>
            </h2>

            <div className="flex items-center gap-3 mt-9" aria-hidden="true">
  <div className="h-[2px] w-14 bg-[#D96C9C]" />
  <div className="h-[6px] w-[6px] rotate-45 bg-[#111111]" />
  <div className="h-[2px] w-14 bg-[#3F9B9B]" />
</div>

            <p className="mt-9 text-[#4E4942] text-base md:text-lg leading-relaxed max-w-xl">
              A small-batch collection of ghoulish goods where cheerful color,
              crooked details, and a little paranormal mischief meet the
              structured construction of Odd Stitch Studio.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <a
                href="#collection"
                className="bg-[#111111] text-[#EAE3D6] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] hover:-translate-y-1 hover:scale-[1.015] hover:bg-[#7A2E2E] transition-all duration-300 ease-out inline-block"
              >
                Enter Halloween
              </a>

              <a
                href="#process"
                className="border border-[#BEB5A7] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] hover:border-[#7A2E2E] hover:text-[#7A2E2E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out"
              >
                View Process
              </a>
            </div>
          </div>

          {/* FEATURE IMAGE */}
          <div className="relative lg:pl-4 lg:pb-10">
            
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#D6CFC2] bg-[#DDD4C7] shadow-2xl">
              <img
                src="/images/pcmp.jpg"
                alt="Pink and Creepy Makeup Purse"
                className="w-full h-full object-cover"
              />

            </div>

            {/* FLOATING PRODUCT NOTE */}
            <div className="relative lg:absolute lg:-bottom-1 lg:-left-10 mt-5 lg:mt-0 bg-[#F4EEE4] border border-[#D6CFC2] rounded-[2rem] p-7 md:p-8 max-w-sm shadow-xl">
              <p className="uppercase tracking-[0.32em] text-[#D15C91] text-[9px] md:text-[10px] mb-4">
                Featured Work
              </p>

              <p className="text-lg font-semibold text-[#111111]">
                Pink and Creepy Makeup Purse
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#5B5650]">
                An Oversized Void for All the Goodies
              </p>

              <div className="flex items-center gap-2 mt-5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#D96C9C]" />
                <span className="uppercase tracking-[0.3em] text-[8px] text-[#6B655E]">
                  One-of-a-Kind
                </span>
                <span className="h-[5px] w-[5px] rounded-full bg-[#3F9B9B]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="border-b border-[#D6CFC2] bg-[#E3DBCE]">
        <div className="max-w-7xl mx-auto px-6 py-7 grid md:grid-cols-3 gap-6 uppercase tracking-[0.28em] text-[10px] text-[#5E5952]">
          <div>One-of-a-Kind</div>
          <div>Always Intentional</div>
          <div>Deliberately Irregular</div>
        </div>
      </section>

            {/* CURRENT COLLECTION — HALLOWEEN 2026 */}
     <section
  id="collection"
  className="max-w-7xl mx-auto px-6 py-24 lg:py-32"
>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[6px] w-[6px] rounded-full bg-[#D96C9C]" />

              <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs">
                Current Collection
              </p>

              <span className="h-[6px] w-[6px] rounded-full bg-[#3F9B9B]" />
            </div>

            <h3 className="text-4xl md:text-6xl leading-none tracking-[-0.04em] font-semibold text-[#111111]">
              Halloween / 2026
            </h3>
          </div>

          <p
  className="max-w-xl text-[#5B5650] leading-relaxed text-base"
  style={{ marginTop: "5rem" }}
>
            A small-batch gathering of playful oddities, paranormal
            accessories, and cheerfully crooked textile goods. Bright color,
            Halloween imagery, and OSS construction meet somewhere between
            spooky and absurd.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_HALLOWEEN_PRODUCTS.map((product) => {
            const stock = inventory[product.id];
            const quantity = stock?.quantity ?? null;

            const liveStatus =
              quantity === 0
                ? "Acquired"
                : quantity > 0
                ? "Available"
                : product.status;

            const liveInventoryType =
              stock?.inventory_type || product.inventoryType || "unique";

            const liveAvailableQuantity =
              quantity ??
              (product.status.toLowerCase() === "acquired"
                ? 0
                : product.inventory ?? 1);

            const displayProduct = {
              ...product,
              status: liveStatus,
              inventoryType: liveInventoryType,
              availableQuantity: liveAvailableQuantity,
            };

            return (
              <div
                key={product.id}
                className="group bg-[#F4EEE4] border border-[#D6CFC2] rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] bg-[#DDD4C7] overflow-hidden">
                  <img
                    src={product.image}
                    alt={
                      typeof product.title === "string"
                        ? product.title
                        : "OSS Halloween Product"
                    }
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  {liveStatus.toLowerCase() === "acquired" && (
                    <div className="absolute top-6 right-[-55px] rotate-45 origin-center z-20 bg-[#111111] text-[#EAE3D6] px-14 py-1 text-[9px] uppercase tracking-[0.35em] font-semibold shadow-xl">
                      Acquired
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="h-[7px] w-[7px] rounded-full bg-[#D96C9C] shadow-sm" />
                    <span className="h-[7px] w-[7px] rounded-full bg-[#3F9B9B] shadow-sm" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="uppercase tracking-[0.28em] text-[8px] text-[#7A2E2E] mb-3">
                    {product.type}
                  </p>

                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-lg leading-tight text-[#111111] font-semibold">
                      {product.title}
                    </h4>

                    {liveStatus === "Available" && (
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A2E2E] whitespace-nowrap">
                        {product.price}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#5B5650]">
                    {product.description}
                  </p>

                  {liveStatus === "Available" &&
                    liveInventoryType === "limited" &&
                    liveAvailableQuantity > 1 && (
                      <p className="mt-4 uppercase tracking-[0.25em] text-[8px] text-[#8A8074]">
                        {liveAvailableQuantity} Available
                      </p>
                    )}

                  <button
                    onClick={() => setSelectedWork(displayProduct)}
                    className="mt-6 w-full border border-[#BEB5A7] px-6 py-3 rounded-full uppercase tracking-[0.25em] text-[9px] hover:border-[#D15C91] hover:text-[#D15C91] hover:-translate-y-1 transition-all duration-300 ease-out"
                  >
                    Inspect Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-14">
          <a
            href="/works"
            className="uppercase tracking-[0.35em] text-[11px] text-[#7A2E2E] hover:text-[#111111] hover:tracking-[0.4em] transition-all duration-300"
          >
            View All Halloween Works →
          </a>
        </div>
      </section>


      {/* FROM THE OSS ARCHIVE — WONDERLAND */}
      <section className="border-y border-[#D6CFC2] bg-[#E3DBCE]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <div>
              <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-[10px] mb-4">
                From the OSS Archive
              </p>

              <h3 className="leading-none tracking-[-0.04em] font-semibold">
  <span className="block text-3xl md:text-5xl text-[#111111]">
    Wonderland
  </span>

  <span className="block mt-2 text-2xl md:text-3xl text-[#7A2E2E]">
    1.0
  </span>
</h3>
            </div>

            <p className="max-w-lg text-[#6B655E] leading-relaxed text-sm">
              The inaugural OSS collection explored familiar carry forms
              through color, storybook references, graphic textiles, and
              deliberately unconventional combinations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {WONDERLAND_PRODUCTS.map((product) => {
              const stock = inventory[product.id];
              const quantity = stock?.quantity ?? null;

              const liveStatus =
                quantity === 0
                  ? "Acquired"
                  : quantity > 0
                  ? "Available"
                  : product.status;

              const liveInventoryType =
                stock?.inventory_type || product.inventoryType || "unique";

              const liveAvailableQuantity =
                quantity ??
                (product.status.toLowerCase() === "acquired"
                  ? 0
                  : product.inventory ?? 1);

              const displayProduct = {
                ...product,
                status: liveStatus,
                inventoryType: liveInventoryType,
                availableQuantity: liveAvailableQuantity,
              };

              return (
                <div
                  key={product.id}
                  className="group grid grid-cols-[115px_1fr] md:grid-cols-1 bg-[#EAE3D6] border border-[#CEC5B8] rounded-[1.7rem] overflow-hidden hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-square md:aspect-[16/10] bg-[#DDD4C7] overflow-hidden">
                    <img
                      src={product.image}
                      alt={
                        typeof product.title === "string"
                          ? product.title
                          : "OSS Archive Product"
                      }
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                    />

                    {liveStatus.toLowerCase() === "acquired" && (
                      <div className="absolute inset-0 flex items-end justify-end p-3">
                        <span className="bg-[#111111] text-[#EAE3D6] px-3 py-2 uppercase tracking-[0.25em] text-[7px]">
                          Acquired
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 md:p-6 flex flex-col justify-center">
                    <p className="uppercase tracking-[0.25em] text-[7px] text-[#7A2E2E] mb-2">
                      Wonderland / 01
                    </p>

                    <h4 className="text-base md:text-lg leading-tight text-[#111111] font-semibold">
                      {product.title}
                    </h4>

                    <div className="flex items-center justify-between gap-4 mt-4">
                      {liveStatus === "Available" ? (
                        <span className="text-[9px] uppercase tracking-[0.18em] text-[#7A2E2E]">
                          {product.price}
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-[0.18em] text-[#6B655E]">
                          Acquired
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedWork(displayProduct)}
                        className="uppercase tracking-[0.24em] text-[8px] text-[#5B5650] hover:text-[#7A2E2E] transition-colors duration-300"
                      >
                        Inspect →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href="/works"
              className="uppercase tracking-[0.32em] text-[10px] text-[#6B655E] hover:text-[#7A2E2E] transition-colors duration-300"
            >
              Enter Full Archive →
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-y border-[#D6CFC2] bg-[#F4EEE4]"
      >
        <div className="max-w-7xl mx-auto px-6 py-28 lg:py-36 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <img
              src="/images/philosophy1.png"
              alt="Workshop"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-5">
              Philosophy
            </p>

            <h3 className="text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em] font-semibold text-[#111111]">
              Robust Structure.
              <br />
              Textile personality.
            </h3>

            <p className="mt-10 text-[#5B5650] leading-relaxed text-lg">
              OSS exists where structure meets imagination — where expressive textiles, considered utility, and quiet craftsmanship overlap.
Clean silhouettes and intentional construction create a grounding frame for bold fabrics, playful pairings, and unexpected visual narratives to unfold with clarity rather than chaos.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              <div className="border border-[#D6CFC2] rounded-[2rem] p-7 bg-[#EAE3D6]">
                <h4 className="uppercase tracking-[0.25em] text-[11px] text-[#7A2E2E] mb-4">
                  Materials
                </h4>

                <p className="text-sm leading-relaxed text-[#5B5650]">
                  Textiles are treated as central design elements — from graphic prints to tactile surfaces and unexpected color relationships.
                </p>
              </div>

              <div className="border border-[#D6CFC2] rounded-[2rem] p-7 bg-[#EAE3D6]">
                <h4 className="uppercase tracking-[0.25em] text-[11px] text-[#7A2E2E] mb-4">
                  Construction
                </h4>

                <p className="text-sm leading-relaxed text-[#5B5650]">
                  Every bag is constructed with structural intention, precise sewing methods, and a balance between utility and visual expression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-w-7xl mx-auto px-6 py-28 lg:py-36">
        <div className="max-w-3xl mb-20">
          <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-5">
            Construction Sequence
          </p>

          <h3 className="text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em] font-semibold text-[#111111]">
            From textile exploration to finished construction.
          </h3>
        </div>

       <div className="grid md:grid-cols-4 gap-6">
  {process.map((step, index) => (
    <a
      key={step.title}
      href={step.href}
      className="border border-[#D6CFC2] bg-[#F4EEE4] rounded-[2rem] p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 block"
    >
      <div className="text-[#7A2E2E] text-[11px] tracking-[0.35em] uppercase mb-8">
        0{index + 1}
      </div>

      <h4 className="text-2xl leading-snug text-[#111111] font-semibold">
        {step.title}
      </h4>

      <div className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[#7A2E2E]">
        Enter →
      </div>
    </a>
  ))}
</div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-6 pb-28 lg:pb-36">
        <div className="relative overflow-hidden rounded-[3rem] border border-[#D6CFC2] bg-[#F4EEE4] p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,17,17,0.04),transparent_55%)]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-5">
              Secure Transmission
            </p>

            <h3 className="text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em] font-semibold text-[#111111]">
              Enter the studio registry.
            </h3>

            <p className="mt-8 text-[#5B5650] text-lg leading-relaxed">
              Studio updates, textile experiments, one-of-a-kind drops, and behind-the-scenes construction notes delivered directly.
            </p>

           <form
  action="https://formspree.io/f/xkoekzbj"
  method="POST"
  className="flex flex-col md:flex-row gap-4 mt-12 max-w-2xl mx-auto"
>
  <input
    type="email"
    name="email"
    required
    placeholder="Transmission address"
    className="flex-1 bg-[#EAE3D6] border border-[#C8BFB2] rounded-full px-6 py-4 outline-none text-[#111111] placeholder:text-[#7A746C] focus:border-[#9E2A2B]"
  />

  <button
    type="submit"
    className="bg-[#111111] text-[#EAE3D6] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] shadow-md hover:-translate-y-1 hover:scale-[1.015] hover:shadow-2xl hover:bg-[#7A2E2E] transition-all duration-300 ease-out"
  >
    Open Transmission
  </button>
</form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-[#D6CFC2] bg-[#E3DBCE]"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-2xl tracking-[0.45em] text-[#111111] font-semibold">
              OSS
            </h4>
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[#6B655E] leading-relaxed">
  OSS / COLLECTION REGISTRY / WONDERLAND_01
  <br />
  LOS ANGELES / SMALL BATCH CONSTRUCTION
</p>
            
          </div>

          <div className="flex gap-8 text-[11px] uppercase tracking-[0.25em] text-[#5E5952]">
            <a href="/works" className="hover:text-[#9E2A2B] transition-colors duration-300">
              Archive
            </a>
            <a href="#contact" className="hover:text-[#9E2A2B] transition-colors duration-300">
              Registry
            </a>
          </div>
        </div>
      </footer>
       
      {acquisitionConfirmed && (
  <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#111111]/50 backdrop-blur-md px-6">
    <div className="relative w-full max-w-xl rounded-[2rem] border border-[#D6CFC2] bg-[#F4EEE4] p-8 md:p-12 text-center shadow-2xl">

      <button
        type="button"
        onClick={() => setAcquisitionConfirmed(false)}
        className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#7A2E2E] text-[#7A2E2E] flex items-center justify-center text-xl hover:bg-[#7A2E2E] hover:text-[#F4EEE4] transition-all duration-300"
      >
        ×
      </button>

      <p className="uppercase tracking-[0.35em] text-[10px] text-[#7A2E2E]">
        OSS / Acquisition Register
      </p>

      <h2 className="mt-6 text-4xl md:text-5xl leading-tight tracking-[-0.04em] font-semibold text-[#111111]">
        Acquisition Confirmed.
      </h2>

      <div className="mx-auto mt-7 w-12 border-t border-[#7A2E2E]" />

      <p className="mt-7 text-sm md:text-base leading-relaxed text-[#5B5650]">
        Thank you for acquiring an Odd Stitch Studio work.
        Your payment has been confirmed and your acquisition
        is officially registered.
      </p>

      <p className="mt-5 text-xs leading-relaxed text-[#8A8074]">
        Additional order details and fulfillment information
        will be provided through your purchase confirmation.
      </p>

      <button
        type="button"
        onClick={() => setAcquisitionConfirmed(false)}
        className="mt-9 bg-[#111111] text-[#EAE3D6] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[10px] hover:bg-[#7A2E2E] transition-all duration-300"
      >
        Return to the Studio
      </button>

    </div>
  </div>
)}    
      <WorkInspectionPopup
  selectedWork={selectedWork}
  onClose={() => setSelectedWork(null)}
/>
<CartDrawer
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
/>
    </div>
  );
}
