"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function WorkInspectionPopup({ selectedWork, onClose }) {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (selectedWork) {
      setActiveImage(selectedWork.images?.[0] || selectedWork.image);
    }
  }, [selectedWork]);

  if (!selectedWork) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        width: "100vw",
        height: "100vh",
        background: "rgba(17, 17, 17, 0.5)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div className="relative w-full max-w-xl max-h-[75vh] overflow-y-auto bg-[#F4EEE4] border border-[#D6CFC2] rounded-[1.5rem] shadow-2xl">
       <button
  onClick={onClose}
  className="absolute top-5 right-5 z-50 w-7 h-7 rounded-full border border-[#7A2E2E] bg-[#F4EEE4] text-[#7A2E2E] text-xl flex items-center justify-center hover:bg-[#7A2E2E] hover:text-[#F4EEE4] transition-all duration-300"
>
  ×
</button>

        <div className="flex gap-4 p-4 items-start">
          <div className="w-[220px] shrink-0">
  <div className="h-[160px] overflow-hidden rounded-[1.25rem] bg-[#DDD4C7] border border-[#D6CFC2]">
    <img
      src={activeImage}
      alt={selectedWork.title}
      className="w-full h-full object-cover"
    />
  </div>

  {selectedWork.images?.length > 1 && (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {selectedWork.images.map((img) => (
        <button
          key={img}
          onClick={() => setActiveImage(img)}
          className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border transition-all ${
            activeImage === img
              ? "border-[#7A2E2E]"
              : "border-[#D6CFC2]"
          }`}
        >
          <img
            src={img}
            alt={`${selectedWork.title} thumbnail`}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  )}
</div>


          <div className="flex-1 pt-1 min-w-0">
            <p className="uppercase tracking-[0.28em] text-[#7A2E2E] text-[9px] mb-3">
              Work Inspection
            </p>

            <h2 className="text-xl leading-tight font-semibold">
              {selectedWork.title}
            </h2>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="text-[8px] uppercase tracking-[0.14em] text-[#8A8074] whitespace-nowrap">
                {selectedWork.status}
              </span>

              <span className="text-[8px] uppercase tracking-[0.14em] text-[#8A8074] whitespace-nowrap">
                {selectedWork.type}
              </span>
            </div>

            <div className="mt-4 border-t border-[#D6CFC2] pt-3">
              <p className="uppercase tracking-[0.22em] text-[9px] text-[#7A2E2E] mb-1">
                Dimensions
              </p>

              <p className="text-xs text-[#5B5650] leading-relaxed">
                {selectedWork.dimensions}
              </p>
            </div>

            <div className="mt-3 border-t border-[#D6CFC2] pt-3">
              <p className="uppercase tracking-[0.22em] text-[9px] text-[#7A2E2E] mb-1">
                Studio Notes
              </p>

              <p className="text-xs text-[#5B5650] leading-relaxed">
                {selectedWork.story}
              </p>
            </div>
           {selectedWork.status?.toLowerCase() === "available" &&
  selectedWork.stripeUrl && (
    <a
      href={selectedWork.stripeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#EAE3D6] hover:bg-[#7A2E2E] transition-all duration-300"
    >
      Acquire
    </a>
)}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}