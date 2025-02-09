import React from "react";
import CategoryCard from "./CategoryCard";
import { motion } from "framer-motion";

interface Category {
  title: string;
  imageUrl: string;
  itemCount: number;
  description?: string;
}

interface FeaturedCategoriesProps {
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
}

const defaultCategories: Category[] = [
  {
    title: "Sofas & Armchairs",
    description: "Comfortable seating solutions for every home",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=350&h=350&auto=format&fit=crop",
    itemCount: 128,
  },
  {
    title: "Tables & Desks",
    description: "Functional workspace and dining furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=350&h=350&auto=format&fit=crop",
    itemCount: 95,
  },
  {
    title: "Storage Solutions",
    description: "Organize your space with style",
    imageUrl:
      "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?q=80&w=350&h=350&auto=format&fit=crop",
    itemCount: 156,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const FeaturedCategories = ({
  categories = defaultCategories,
  onCategoryClick = () => {},
}: FeaturedCategoriesProps) => {
  return (
    <section className="w-full bg-gradient-to-b from-[#f5f5f5] to-white py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-[#111111]">
            Featured Categories
          </h2>
          <p className="text-lg text-[#666666] max-w-[600px] mx-auto">
            Browse our most popular pre-loved furniture collections
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <CategoryCard
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
                itemCount={category.itemCount}
                onClick={() => onCategoryClick(category)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => onCategoryClick(categories[0])}
            className="text-[#0058AB] hover:text-[#004f99] font-semibold text-lg flex items-center gap-2 mx-auto group transition-all duration-300"
          >
            View All Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
