import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  itemCount?: number;
  onClick?: () => void;
}

const CategoryCard = ({
  title = "Sofas & Armchairs",
  description = "Comfortable seating solutions for every home",
  imageUrl = "https://dummyimage.com/350x350/f5f5f5/666666&text=Furniture+Category",
  itemCount = 128,
  onClick = () => {},
}: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Card
        className="w-[350px] bg-white overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl border border-[#e5e5e5] hover:border-[#0058AB]"
        onClick={onClick}
      >
        <div className="relative">
          <div className="relative h-[270px] overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              initial={false}
            />
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20"
              initial={false}
            >
              <p className="text-lg font-medium mb-2">{description}</p>
              <div className="flex items-center gap-2 text-[#FBD914]">
                <span>Browse Collection</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          </div>
          <div className="p-6 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#111111] mb-1 group-hover:text-[#0058AB] transition-colors">
                  {title}
                </h3>
                <p className="text-[#666666]">{itemCount} items available</p>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-[#0058AB]/10 flex items-center justify-center text-[#0058AB] transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
