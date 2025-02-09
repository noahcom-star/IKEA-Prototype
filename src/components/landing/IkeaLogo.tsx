import React from "react";

interface IkeaLogoProps {
  className?: string;
}

const IkeaLogo = ({ className = "" }: IkeaLogoProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-[120px] h-[40px] ${className}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <span className="text-[#0058AB] text-2xl font-bold tracking-widest">
          IKEA
        </span>
      </div>
      <div className="text-[#0058AB] text-xs font-medium mt-1">Marketplace</div>
    </div>
  );
};

export default IkeaLogo;
