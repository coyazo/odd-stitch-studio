export default function ConstructionPage() {
  const constructionImages = [
    "/images/construction1.png",
    "/images/construction2.png",
    "/images/construction3.png",
    "/images/construction4.png",
    "/images/construction5.png",
    "/images/construction6.png",
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
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <p className="uppercase tracking-[0.3em] text-[#7A2E2E] text-xs mb-6">
          Studio / Construction
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.04em]">
          Quilting & Construction
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#5B5650]">
          Layered structure, reinforced seams, textile architecture, and the
          quiet engineering behind every OSS piece.
        </p>
      </section>

      {/* TRIANGLE IMAGE GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {constructionImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            >
              <img
                src={image}
                alt={`Construction process ${index + 1}`}
                className="w-full h-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-700" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}