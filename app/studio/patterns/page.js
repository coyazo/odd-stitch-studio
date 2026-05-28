export default function PatternDraftingPage() {
  const sketches = [
    "/images/pattern-draft-1.png",
    "/images/pattern-draft-2.png",
    "/images/pattern-draft-3.png",
  ];

  return (
    <main className="min-h-screen bg-[#EAE3D6] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
  <a
    href="/"
    className="inline-flex items-center gap-3 border border-[#BEB5A7] px-6 py-3 rounded-full uppercase tracking-[0.25em] text-[10px] text-[#5B5650] hover:border-[#7A2E2E] hover:text-[#7A2E2E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out"
  >
    ← Return to OSS
  </a>
</div>
      
      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <p className="uppercase tracking-[0.3em] text-[#7A2E2E] text-xs mb-6">
          Studio / Pattern Drafting
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.04em]">
          Pattern Drafting
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#5B5650]">
          Structural layouts, silhouette studies, dimensional planning,
          and functional geometry for OSS works.
        </p>
      </section>

      {/* IMAGE GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sketches.map((image, index) => (
            <div
              key={index}
              className="bg-[#F4EFE6] border border-black/10 p-5 shadow-sm"
            >
              <img
                src={image}
                alt={`OSS pattern drafting sketch ${index + 1}`}
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}