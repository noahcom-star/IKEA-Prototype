import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./landing/HeroSection";
import FeaturedCategories from "./landing/FeaturedCategories";
import TrustIndicators from "./landing/TrustIndicators";
import IkeaRework from "./landing/IkeaRework";
import Navbar from "./landing/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleBrowseClick = () => navigate("/marketplace");
  const handleSellClick = () => navigate("/sell");

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar onBrowseClick={handleBrowseClick} onSellClick={handleSellClick} />
      <main className="pt-[80px]">
        <HeroSection
          onCtaClick={handleBrowseClick}
          onSellClick={handleSellClick}
        />
        <IkeaRework />
        <TrustIndicators />
        <FeaturedCategories onCategoryClick={() => navigate("/marketplace")} />
      </main>
    </div>
  );
};

export default Home;
