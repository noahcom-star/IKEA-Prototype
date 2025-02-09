import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CtaButtonProps {
  text?: string;
  onClick?: () => void;
}

const CtaButton = ({
  text = "Browse Marketplace",
  onClick = () => {},
}: CtaButtonProps) => {
  return (
    <Button
      className="bg-[#0058AB] hover:bg-[#004f99] text-white px-8 py-6 text-lg font-semibold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      onClick={onClick}
    >
      {text}
      <ArrowRight className="w-5 h-5" />
    </Button>
  );
};

export default CtaButton;
