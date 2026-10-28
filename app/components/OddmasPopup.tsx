
"use client";

import { useEffect, useState } from "react";

export default function OddmasPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Stop showing the announcement on launch day.
    const params = new URLSearchParams(window.location.search);

if (params.get("checkout") === "success") {
  return;
}
    const launch = new Date("2026-11-18T00:00:00-08:00");

    if (
      new Date() < launch &&
      !sessionStorage.getItem("oss-oddmas-dismissed")
    ) {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("oss-oddmas-dismissed", "true");
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener(
      "keydown",
      handleEscape
    );
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="oddmas-title"
        className="relative w-full max-w-lg border border-[#7A2E2E] bg-[#EAE3D6] p-5 text-[#111111] shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute right-4 top-3 text-2xl hover:text-[#7A2E2E]"
        >
          ×
        </button>

        <div className="border border-[#7A2E2E] px-5 py-10 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#7A2E2E]">
            Odd Stitch Studio Presents
          </p>

          <h2
            id="oddmas-title"
            className="mb-3 text-3xl font-bold tracking-widest sm:text-4xl"
          >
            ODDMAS TIME
          </h2>

          <p className="mb-7 text-xs uppercase tracking-widest text-[#7A2E2E]">
            A Holiday Collection
          </p>

          <div className="mb-7 border-y border-[#7A2E2E] py-5">
            <p className="text-xl font-semibold tracking-wider">
              NOVEMBER 18, 2026
            </p>
          </div>

          <p className="mb-4 font-semibold">
            Something wonderfully odd is coming.
          </p>

          <p className="mb-8 text-sm leading-7">
            Original soft goods, unexpected details,
            and a little holiday mischief.
          </p>

          <button
            type="button"
            onClick={dismiss}
            className="bg-[#111111] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#7A2E2E]"
          >
            Return to Studio
          </button>

          <p className="mt-9 text-[10px] uppercase tracking-widest text-[#7A2E2E]">
            Structured. Expressive. Intentionally Odd.
          </p>
        </div>
      </div>
    </div>
  );
}
