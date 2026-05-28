"use client";

import { createPortal } from "react-dom";

export default function WorkInspectionPopup({ selectedWork, onClose }) {
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
          <div className="w-[220px] h-[160px] shrink-0 overflow-hidden rounded-[1.25rem] bg-[#DDD4C7] border border-[#D6CFC2]">
            <img
              src={selectedWork.image}
              alt={selectedWork.title}
              className="w-full h-full object-cover"
            />
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
            {product.status === "available" && product.stripeUrl && (
  <a href={product.stripeUrl}>
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