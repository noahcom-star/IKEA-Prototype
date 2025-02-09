import { Shield, BadgeCheck, Lock, Sparkles, Scale, Clock } from "lucide-react";
import TrustCard from "./TrustCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TrustIndicatorsProps {
  indicators?: Array<{
    title: string;
    description: string;
    icon:
      | typeof Shield
      | typeof BadgeCheck
      | typeof Lock
      | typeof Sparkles
      | typeof Scale
      | typeof Clock;
  }>;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const TrustIndicators = ({
  indicators = [
    {
      title: "IKEA Quality Verified",
      description:
        "Every item is thoroughly inspected by IKEA experts to ensure authenticity and quality standards",
      icon: BadgeCheck,
    },
    {
      title: "Secure Transactions",
      description:
        "Advanced fraud prevention and secure payment processing with buyer protection guarantee",
      icon: Lock,
    },
    {
      title: "Money-Back Guarantee",
      description:
        "100% refund if item condition doesn't match the listing or verification standards",
      icon: Shield,
    },
    {
      title: "Professional Inspection",
      description:
        "Items undergo a 20-point inspection process before being listed on the marketplace",
      icon: Sparkles,
    },
    {
      title: "Fair Price Promise",
      description:
        "Price matching and transparency with original IKEA retail prices clearly displayed",
      icon: Scale,
    },
    {
      title: "Fast Verification",
      description:
        "48-hour verification process with real-time status updates on your purchase",
      icon: Clock,
    },
  ],
}: TrustIndicatorsProps) => {
  return (
    <section className="w-full bg-gradient-to-b from-[#f8f8f8] to-white py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl font-bold mb-4 text-[#111111] relative z-10">
              Shop with Complete Confidence
            </h2>
            <motion.svg
              className="absolute -bottom-2 left-0 w-full z-0"
              height="20"
              viewBox="0 0 600 20"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M 0 15 Q 150 5, 300 15 Q 450 25, 600 15"
                fill="none"
                stroke="#FBD914"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  filter: "url(#rough)",
                  strokeDasharray: "5,5",
                }}
              />
              <defs>
                <filter id="rough">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.1"
                    numOctaves="2"
                    result="noise"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>
              </defs>
            </motion.svg>
          </div>
          <p className="text-lg text-[#666666] max-w-[600px] mx-auto mt-8">
            Every transaction is protected by IKEA's comprehensive buyer
            protection program
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <TrustCard
                title={indicator.title}
                description={indicator.description}
                icon={indicator.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-[#0058AB]/10 mb-8">
            <Shield className="w-5 h-5 text-[#0058AB] mr-2" />
            <span className="text-sm font-medium text-[#0058AB] mr-4">
              IKEA Buyer Protection Program
            </span>
            <Button
              variant="link"
              className="text-[#0058AB] hover:text-[#004f99] text-sm font-medium"
              onClick={() => window.open("#", "_blank")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
