"use client";
import { useState } from "react";
import WorkInspectionPopup from "./components/WorkInspectionPopup";
export default function OSSWebsite() {
  const [selectedWork, setSelectedWork] = useState<any>(null);
    const products = [
  {
    id: "qoh",
    name: 'Queen of Hearts Weekender & Alice Mini',
    title: "Queen of Hearts Weekender & Alice Mini",
    description:
      'Sturdy, colorful and attention-demanding - an overnight bag and a mini fit for a...',
    price: '$200',
    status: "Acquired",
    dimensions: "18L X 5W X 11H",
    story:
        "A bold Wonderland pairing built around saturated color, graphic contrast, and structured utility.",
    type: "Boxy Duffle & Cosmetic Bag",
    image: '/images/QOH&A.png',
   images:[
      "images/ugh.png",
      "images/QOH&A.png",
      ],
    sold: true,
  },
  {
    id: "alice",
    name: "Alice Weekender",
    title: "Alice Weekender",
    description:
      'Reimagined duffle bag made to stand out and be fashionably Wonderland!',
    price: '$175',
    status: "available",
    dimensions:"18L X 5W X 11H",
    story:"A reimagined duffle bag made to stand out and feel fashionably Wonderland.",
    type: "Boxy Duffle",
    image:'/images/aliceweekender.png',
    images: [
    "/images/aliceupclose.png",
    "/images/alicetop.png",
    "/images/aliceback.png",
    "/images/alicelining.png",
    "/images/aliceweekender.png",
  ],
    sold: false,
    stripeUrl:"https://buy.stripe.com/aFa5kx3qN1GL9q44pXe3e05",
  },
  {
    id: "rabbit",
    name: 'Down the Rabbit Hole Carry-Along',
    title: "Down the Rabbit Hole Carry-Along",
    description:
      'Curved to Carry - holds all those essentials for all those otherworldly trips.',
    price: '$125',
    status: "available",
    dimensions: "15.5L X 3.5W X 12H",
    story:
        "A curved carry piece designed for everyday essentials and otherworldly little trips.",
      type: "Structured & Curved Zip Up",
    image: '/images/DTRH1.png',
    images: [
    "/images/dtrhfrontzip.png",
    "/images/dtrhback.png",
    "/images/dtrhside.png",
    "/images/dtrhtopzip.png",
    "images/DTRH1.png",
  ],
    sold: false,
    stripeUrl:"https://buy.stripe.com/7sY4gt2mJ715eKog8Fe3e06",
  },
];
const process = [
  { title: "Textile Exploration", href: "/studio/textiles" },
  { title: "Pattern Drafting", href: "/studio/patterns" },
  { title: "Quilting & Construction", href: "/studio/construction" },
  { title: "Archive", href: "/works" }
];
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
            <a href="#collection" className="hover:text-[#9E2A2B] transition-colors duration-300">
              Collection
            </a>
            <a href="#about" className="hover:text-[#9E2A2B] transition-colors duration-300">
              Philosophy
            </a>
            <a href="#process" className="hover:text-[#9E2A2B] transition-colors duration-300">
              Process
            </a>
            <a href="#contact" className="hover:text-[#9E2A2B] transition-colors duration-300">
              Registry
            </a>
          </nav>

          <a
          href="/works"
          className="bg-[#111111] text-[#EAE3D6] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] shadow-md hover:-translate-y-1 hover:scale-[1.015] hover:shadow-2xl hover:bg-[#7A2E2E] transition-all duration-300 ease-out">
            Archive
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#D6CFC2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(17,17,17,0.04),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-6 py-28 lg:py-36 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <p className="uppercase tracking-[0.4em] text-[#7A2E2E] text-xs mb-6">
              Soft Goods, Speaking Loudly
            </p>

            <h2 className="text-5xl md:text-7xl leading-[0.92] tracking-[-0.04em] font-semibold text-[#111111]">
              Structured.
              <br />
              Expressive.
              <br />
              Intentionally odd.
            </h2>

            <p className="mt-10 text-[#4E4942] text-lg leading-relaxed max-w-xl">
              OSS creates functional fabric expressions that balance disciplined construction with joyful individuality. Each work combines engineered structure, expressive fabric choices, and intentional irregularity into utility goods that feel authored rather than manufactured.
            </p>

            <div className="flex flex-wrap gap-5 mt-12">
             <a
  href="#collection"
  className="bg-[#111111] text-[#EAE3D6] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] hover:-translate-y-1 hover:scale-[1.015] hover:bg-[#7A2E2E] transition-all duration-300 ease-out inline-block"
>
  Operation: Wonderland 1.0
</a>
<a
href="#process"
className="border border-[#BEB5A7] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] hover:border-[#7A2E2E] hover:text-[#7A2E2E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out">
                View Process
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#D6CFC2] bg-[#DDD4C7] shadow-2xl">
              <img
                src="/images/QOH.png"
                alt="Pattern"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-10 -left-10 bg-[#F4EEE4] border border-[#D6CFC2] rounded-[2rem] p-8 max-w-sm shadow-xl">
              <p className="uppercase tracking-[0.3em] text-[#7A2E2E] text-[10px] mb-4">
                Design Principle
              </p>

              <p className="text-sm leading-relaxed text-[#4D4842]">
                Structured utility interpreted through playful textile experimentation and engineered individuality.
              </p>
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

      {/* COLLECTION */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
          <div>
            <p className="uppercase tracking-[0.35em] text-[#7A2E2E] text-xs mb-5">
              Current Collection
            </p>

            <h3 className="text-4xl md:text-6xl leading-none tracking-[-0.04em] font-semibold text-[#111111]">
              Wonderland 1.0
            </h3>
          </div>

          <p className="max-w-xl text-[#5B5650] leading-relaxed text-base">
            The first OSS collection explores everyday carry through a surreal, storybook lens—drawing from an artistic reinterpretation of Alice in Wonderland imagery. Bags and toiletry cases become shifting landscapes of color, pattern, and symbolism, where familiar forms are reimagined rather than replicated.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
           <div
  key={product.id}
  className="group bg-[#F4EEE4] border border-[#D6CFC2] rounded-[2.2rem] hover:-translate-y-1 transition-all duration-500"
>
              <div className="relative aspect-[4/5] bg-[#DDD4C7] overflow-visible">
  
  {/* IMAGE */}
  <img
    src={product.image}
    alt={typeof product.name === 'string' ? product.name : 'OSS Product'}
    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
  />

 {/* ACQUIRED RIBBON */}
{product.status.toLowerCase() === "acquired" && (
  <div className="absolute top-6 right-[-55px] rotate-45 origin-center z-50 bg-[#111111] text-[#EAE3D6] px-14 py-1 text-[10px] uppercase tracking-[0.4em] font-semibold shadow-2xl">
    Acquired
  </div>
)}

</div>

              <div className="p-8">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-xl leading-tight text-[#111111] font-semibold">
                      {product.name}
                    </h4>

                    <p className="mt-4 text-sm leading-relaxed text-[#5B5650]">
                      {product.description}
                    </p>
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A2E2E] whitespace-nowrap">
                    {product.price}
                  </span>
                </div>

                <button
  onClick={() => setSelectedWork(product)}
  className="mt-8 w-full border border-[#BEB5A7] px-8 py-4 rounded-full uppercase tracking-[0.25em] text-[11px] hover:border-[#7A2E2E] hover:text-[#7A2E2E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out"
>
  Inspect Item
</button>
              </div>
            </div>
          ))}
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
      <WorkInspectionPopup
  selectedWork={selectedWork}
  onClose={() => setSelectedWork(null)}
/>
    </div>
  );
}
