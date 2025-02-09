import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Upload } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  sellCtaText?: string;
  onCtaClick?: () => void;
  onSellClick?: () => void;
}

const taglines = [
  "Reduce Waste, Save Money",
  "Sustainable Living Made Easy",
  "Find Your Next Favorite Piece",
  "Give Furniture a Second Chance",
];

const HeroSection = ({
  subtitle = "Buy and sell pre-loved IKEA furniture in our sustainable marketplace",
  imageUrl = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1512&auto=format&fit=crop",
  ctaText = "Browse Marketplace",
  sellCtaText = "Sell Your Furniture",
  onCtaClick = () => {},
  onSellClick = () => {},
}: HeroSectionProps) => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const highlightVariants = {
    initial: {
      width: 0,
      opacity: 0,
    },
    animate: {
      width: "100%",
      opacity: 0.2,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section className="relative w-full min-h-[85vh] bg-[#f8f8f8]">
      <div className="absolute inset-0 grid grid-cols-12">
        {/* Left Content */}
        <div className="col-span-7 bg-[#f8f8f8] flex items-center justify-center p-12">
          <div className="max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-[72px] font-bold leading-[1.1] tracking-tight text-[#111111]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Give Your IKEA Furniture a{" "}
                  <span className="relative inline-block">
                    <motion.span
                      className="relative z-10 block text-[#111111]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Second Life.
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-[#FBD914] -bottom-2 -top-1 -z-10"
                      variants={highlightVariants}
                      initial="initial"
                      animate="animate"
                      style={{
                        originX: 0,
                        originY: 0,
                      }}
                    />
                  </span>
                </motion.h1>

                {/* Rotating Taglines */}
                <div className="h-14 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTagline}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-[32px] font-semibold text-[#0058AB]"
                    >
                      {taglines[currentTagline]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <motion.p
                  className="text-xl text-[#484848] max-w-[520px] leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {subtitle}
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="relative max-w-[520px] group"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative flex items-center">
                  <Search
                    className="absolute left-4 text-[#0058AB]"
                    size={24}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for furniture, categories, or items..."
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-white border-2 border-[#0058AB]/10 focus:border-[#0058AB] focus:outline-none text-[#111111] text-lg placeholder:text-[#666666] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
                  />
                </div>
              </motion.form>

              <div className="flex items-center gap-4 pt-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    className="bg-[#0058AB] hover:bg-[#004f99] text-white px-10 h-14 text-lg font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 border-transparent group"
                    onClick={onCtaClick}
                  >
                    {ctaText}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    variant="outline"
                    onClick={onSellClick}
                    className="border-2 border-[#0058AB] text-[#0058AB] hover:bg-[#0058AB] hover:text-white px-10 h-14 text-lg font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden"
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      {sellCtaText}
                      <Upload className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-[#FBD914]/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-5 relative overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 w-[50%] bg-gradient-to-r from-[#f8f8f8] via-[#f8f8f8]/80 to-transparent z-10" />
            <img
              src={imageUrl}
              alt="Modern IKEA furniture in a bright, minimalist setting"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0058AB]/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
