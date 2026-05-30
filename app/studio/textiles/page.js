export default function TextilePage() {
  const textiles = [
    "/images/textile1.jpg",
    "/images/textile2.jpg",
    "/images/textile3.jpg",
    "/images/textile4.jpg",
    "/images/textile5.jpg",
    "/images/textile6.jpg",
    "/images/textile7.jpg",
    "/images/textile8.jpg",
    "/images/textile9.jpg",
    "/images/textile10.jpg",
    "/images/textile11.jpg",
    "/images/textile12.jpg",
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
        <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-6">
          Studio / Textile Exploration
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.04em]">
          Textile Field
        </h1>
         <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#5B5650]">
          Soft cottons made to be sturdy, heavy fabrics made to look crisp and delicate. All textiles used are responsibly sourced.  Designer fabrics stem from all-inclusive companies.
        </p>
      </section>

      {/* TEXTILE FIELD */}
      <section className="px-6 pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-24 place-items-center">

          {textiles.map((src, index) => (
  <div
    key={index}
    className="relative w-[220px] h-[220px] rounded-full overflow-hidden border border-[#D6CFC2]"
  >

    {/* COLOR IMAGE */}
    <img
      src={src}
      alt={`textile-${index}`}
      className="w-full h-full object-cover"
    />

    {/* GRAYSCALE HALF */}
    <div className="absolute top-0 left-0 w-1/2 h-full bg-black/40 bg-[#EAE3D6]/20" />

    {/* DIVIDER */}
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black/20" />

  </div>
))}

        </div>
      </section>

    </main>
  );
}