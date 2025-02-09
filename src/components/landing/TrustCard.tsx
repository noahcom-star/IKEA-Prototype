import { Card } from "@/components/ui/card";
import { Shield, Star, Truck, BadgeCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface TrustCardProps {
  title: string;
  description: string;
  icon:
    | typeof Shield
    | typeof Star
    | typeof Truck
    | typeof BadgeCheck
    | typeof Lock;
}

const checkmarkAnimation = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const lockAnimation = {
  hidden: { scaleY: 1.5, y: 10, opacity: 0 },
  visible: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const shieldAnimation = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const AnimatedBadgeCheck = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      initial="hidden"
      animate="visible"
      variants={shieldAnimation}
    />
    <motion.path
      d="m9 12 2 2 4-4"
      initial="hidden"
      animate="visible"
      variants={checkmarkAnimation}
    />
  </motion.svg>
);

const AnimatedLock = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.rect
      width="18"
      height="11"
      x="3"
      y="11"
      rx="2"
      ry="2"
      initial="hidden"
      animate="visible"
      variants={lockAnimation}
    />
    <motion.path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      initial="hidden"
      animate="visible"
      variants={checkmarkAnimation}
    />
  </motion.svg>
);

const AnimatedShield = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
      initial="hidden"
      animate="visible"
      variants={shieldAnimation}
    />
    <motion.path
      d="m9 12 2 2 4-4"
      initial="hidden"
      animate="visible"
      variants={checkmarkAnimation}
    />
  </motion.svg>
);

const TrustCard = ({
  title = "Verified Quality",
  description = "Every item is thoroughly inspected to ensure IKEA quality standards",
  icon: Icon = Shield,
}: TrustCardProps) => {
  const getAnimatedIcon = () => {
    if (Icon === BadgeCheck) return <AnimatedBadgeCheck />;
    if (Icon === Lock) return <AnimatedLock />;
    if (Icon === Shield) return <AnimatedShield />;
    return <Icon size={32} />;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="group flex flex-col items-center text-center gap-6 px-8 py-8 bg-white min-h-[260px] transition-all duration-300 hover:shadow-lg border border-[#e5e5e5] hover:border-[#0058AB]">
        <motion.div
          className="p-4 rounded-2xl bg-gradient-to-br from-[#0058AB] to-[#004f99] text-white"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {getAnimatedIcon()}
        </motion.div>
        <div className="space-y-3">
          <h3 className="font-bold text-[#111111] text-xl tracking-tight">
            {title}
          </h3>
          <p className="text-[#666666] text-base leading-relaxed">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default TrustCard;
