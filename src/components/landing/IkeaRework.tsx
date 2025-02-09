import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BeforeAfterItem {
  title: string;
  originalPrice: number;
  prelovedPrice: number;
  description: string;
  locations: Array<{ image: string; style: string }>;
}

const items: BeforeAfterItem[] = [
  {
    title: "BILLY Bookcase",
    originalPrice: 199,
    prelovedPrice: 79,
    description: "A timeless classic, perfect for any room",
    locations: [
      {
        image:
          "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=800",
        style: "Home Library",
      },
      {
        image:
          "https://images.unsplash.com/photo-1597072689297-d8f1431d3100?w=800",
        style: "Living Room",
      },
      {
        image:
          "https://images.unsplash.com/photo-1594026112284-02bb6f3d2699?w=800",
        style: "Study Room",
      },
    ],
  },
  {
    title: "FRIHETEN Sofa Bed",
    originalPrice: 799,
    prelovedPrice: 399,
    description: "Versatile comfort for day and night",
    locations: [
      {
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        style: "Living Room",
      },
      {
        image:
          "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800",
        style: "Guest Room",
      },
      {
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800",
        style: "Studio Apartment",
      },
    ],
  },
  {
    title: "MALM Dresser",
    originalPrice: 349,
    prelovedPrice: 159,
    description: "Sleek storage solution that stands the test of time",
    locations: [
      {
        image:
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
        style: "Bedroom",
      },
      {
        image:
          "https://images.unsplash.com/photo-1595428774181-739d04114a76?w=800",
        style: "Nursery",
      },
      {
        image:
          "https://images.unsplash.com/photo-1595428774125-0e438e2f1c59?w=800",
        style: "Walk-in Closet",
      },
    ],
  },
];

const IkeaPreloved = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="relative inline-block">
            <h2 className="text-4xl font-bold text-[#111111] relative z-10">
              #IKEAPreloved
            </h2>
            <motion.svg
              className="absolute -inset-1 z-0"
              viewBox="0 0 300 60"
              preserveAspectRatio="none"
              initial="hidden"
              animate="visible"
            >
              {[...Array(3)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M 0 ${30 + i * 5} Q 150 ${20 + i * 5}, 300 ${35 + i * 5}`}
                  fill="none"
                  stroke="#FBD914"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 0.3,
                    transition: {
                      duration: 1,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  style={{
                    strokeDasharray: "5,10",
                    filter: "url(#crayon)",
                  }}
                />
              ))}
              <defs>
                <filter id="crayon">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.5"
                    numOctaves="2"
                    result="noise"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
              </defs>
            </motion.svg>
          </div>
          <p className="text-lg text-[#666666] max-w-[600px] mx-auto">
            Transform Your Space with Pre-Loved IKEA Furniture
          </p>
          <p className="text-base text-[#666666] max-w-[600px] mx-auto">
            Swipe through real-life transformations and find your next
            inspiration!
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {items.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 pr-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#f8f8f8] rounded-xl p-6 space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[#111111] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#666666]">{item.description}</p>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="text-[#666666] line-through text-lg">
                          ${item.originalPrice}
                        </div>
                        <div className="text-[#0058AB] font-bold text-2xl">
                          ${item.prelovedPrice}
                        </div>
                        <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Save ${item.originalPrice - item.prelovedPrice}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {item.locations.map((location, idx) => (
                        <motion.div
                          key={idx}
                          className="space-y-2"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="relative h-[200px] rounded-lg overflow-hidden group">
                            <img
                              src={location.image}
                              alt={`${item.title} in ${location.style}`}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white p-2 text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              {location.style}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                className="w-2 h-2 rounded-full bg-[#0058AB]/20 transition-all duration-300 hover:bg-[#0058AB]/50"
                onClick={() => emblaApi?.scrollTo(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IkeaPreloved;
