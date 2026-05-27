"use client";
import WorkInspectionPopup from "../components/WorkInspectionPopup";

import { useState } from "react";
import { createPortal } from "react-dom";

export default function WorksPage() {
  const works = [
    {
      title: "Queen of Hearts Weekender & Alice Mini",
      type: "Boxy Duffle & Cosmetic Bag",
      image: "/images/QOH&A.png",
      status: "Acquired",
      price:"$325",
      dimensions: "Dimensions coming soon",
      story:
        "A bold Wonderland pairing built around saturated color, graphic contrast, and structured utility.",
    },
    {
      title: "Alice Weekender",
      type: "Boxy Duffle",
      image:"/images/testimage.jpg",
      status: "Available",
      price:"$225",
      dimensions: "Dimensions coming soon",
      story:
        "A reimagined duffle bag made to stand out and feel fashionably Wonderland.",
    },
    {
      title: "Down the Rabbit Hole Carry-Along",
      type: "Structured & Curved Zip Up",
      image: "/images/DTRH1.png",
      status: "Available",
      price:"$125",
      dimensions: "Dimensions coming soon",
      story:
        "A curved carry piece designed for everyday essentials and otherworldly little trips.",
    },
    {
      title: "Big City Block",
      type: "Gladstone Bag",
      image: "/images/bcb.png",
      status: "Available",
      price:"$275",
      dimensions: "Dimensions coming soon",
      story:
        "A structured Gladstone-style piece with architectural presence and practical interior volume.",
    },
    {
      title: "Small City Block",
      type: "Gladstone Bag",
      image: "/images/scb.png",
      status: "Available",
      price:"$175",
      dimensions: "Dimensions coming soon",
      story:
        "A smaller interpretation of the City Block form, balancing structured shape with compact utility.",
    },
    {
      title: "E-City Block",
      type: "Laptop Sleeve",
      image: "/images/ecb.png",
      status: "Available",
      price:"$45",
      dimensions: "Dimensions coming soon",
      story:
        "A protective textile sleeve designed for tech carry with OSS structure and visual intention.",
    },
  ];

  const [selectedWork, setSelectedWork] = useState(null);

  return (
    <main className="min-h-screen bg-[#EAE3D6] text-[#111111]">
      {/* HEADER */}
      <section className="border-b border-[#D6CFC2]">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-40">
          <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-6">
            OSS Registry
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
    </main>
  );
}