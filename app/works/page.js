"use client";
import WorkInspectionPopup from "../components/WorkInspectionPopup";
import CartButton from "../components/CartButton";
import CartDrawer from "../components/CartDrawer";

import { useState } from "react";

export default function WorksPage() {
  const works = [
    {
      id: "qoh",
      title: "Queen of Hearts Weekender & Alice Mini",
      type: "Boxy Duffle & Cosmetic Bag",
      image: "/images/QOH&A.png",
      images:[
      "images/QOH&A.png",
      ],
      status: "Acquired",
      price:"$200",
      priceCents: 20000,
      dimensions: "18L X 5W X 11H",
      story:
        "A bold Wonderland pairing built around saturated color, graphic contrast, and structured utility.",
    },
    {
      id: "alicew",
      title: "Alice Weekender",
      type: "Boxy Duffle",
      image:"/images/aliceweekender.png",
      images: [
    "/images/aliceupclose.png",
    "/images/alicetop.png",
    "/images/aliceback.png",
    "/images/alicelining.png",
    "/images/aliceweekender.png",
  ],
      status: "Available",
      price:"$100",
      priceCents: 10000,
      dimensions: "18L X 5W X 11H",
      story:
        "A reimagined duffle bag made to stand out and feel fashionably Wonderland.",
         stripeUrl:"https://buy.stripe.com/aFa5kx3qN1GL9q44pXe3e05",
    },
    {
      id: "dtrh",
      title: "Down the Rabbit Hole Carry-Along",
      type: "Structured & Curved Zip Up - A Minki Kim Pattern",
      image: "/images/DTRH1.png",
      images: [
    "/images/dtrhfrontzip.png",
    "/images/dtrhback.png",
    "/images/dtrhside.png",
    "/images/dtrhtopzip.png",
    "images/DTRH1.png",
  ],
      status: "Available",
      price:"$80",
      priceCents: 8000,
      dimensions: "15.5L X 3.5W X 12H",
      story:
        "A curved carry piece designed for everyday essentials and otherworldly little trips.",
        stripeUrl:"https://buy.stripe.com/7sY4gt2mJ715eKog8Fe3e06",
    },
    {
      id: "bcbgs",
      title: "Big City Block",
      type: "Gladstone Bag",
      image: "/images/bcb.png",
      images: [
    "/images/bcbside.png",
    "/images/bcbinside.png",
    "/images/bcbinsidezip.png",
    "/images/bcb.png",
  ],
      status: "Available",
      price:"$150",
      priceCents: 15000,
      dimensions: "18L X 12.5W X 13H",
      story:
        "A structured Gladstone-style piece with architectural presence and practical interior volume.",
        stripeUrl:"https://buy.stripe.com/8x27sFf9vbhlcCgbSpe3e07",
    },
    {
      id: "scbgs",
      title: "Small City Block",
      type: "Gladstone Bag",
      image: "/images/scb.png",
      images: [
    "/images/scbfull.png",
    "/images/scbhardware.png",
    "/images/scb.png",
  ],
      status: "Available",
      price:"$75",
      priceCents: 7500,
      dimensions: "14L X 7.5W X 9.5H",
      story:
        "A smaller interpretation of the City Block form, balancing structured shape with compact utility.",
        stripeUrl:"https://buy.stripe.com/3cIeV77H3etxcCgg8Fe3e08",
    },
    {
      id: "cbls",
      title: "E-City Block",
      type: "Laptop Sleeve",
      image: "/images/ecb.png",
      images: [
    "/images/ecbupclose.png",
    "/images/ecblaptop.png",
    "/images/ecbinside.png",
    "/images/ecb.png",
  ],
      status: "Available",
      price:"$25",
      priceCents: 2500,
      dimensions: "15L X .75W X 11.5H",
      story:
        "A protective textile sleeve designed for tech carry with OSS structure and visual intention.",
        stripeUrl:"https://buy.stripe.com/6oU5kx5yVbhlfOs6y5e3e09",
    },
  ];

  const [selectedWork, setSelectedWork] = useState(null);
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
          {works.map((work) => (
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
    {work.status}
  </span>
</div>

                <h2 className="text-2xl leading-tight font-semibold">
                  {work.title}
                </h2>
{work.status === "Available" && (
  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#7A2E2E]">
    {work.price}
  </p>
)}
                <button
                  onClick={() => setSelectedWork(work)}
                  className="mt-8 border border-[#BEB5A7] px-6 py-3 rounded-full uppercase tracking-[0.25em] text-[11px] hover:border-[#7A2E2E] hover:text-[#7A2E2E] transition-all duration-300"
                >
                  Inspect Work
                </button>
              </div>
            </div>
          ))}
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