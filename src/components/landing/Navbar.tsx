import React from "react";
import { Button } from "@/components/ui/button";
import IkeaLogo from "./IkeaLogo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  onBrowseClick?: () => void;
  onSellClick?: () => void;
}

const Navbar = ({
  onBrowseClick = () => {},
  onSellClick = () => {},
}: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full h-[80px] bg-white border-b border-gray-200 px-8 fixed top-0 z-50"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <motion.div
          className="flex items-center gap-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <IkeaLogo />
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to="/marketplace"
                className="text-[#111111] hover:text-[#0058AB] font-medium transition-colors"
              >
                Browse Marketplace
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to="/sell"
                className="text-[#111111] hover:text-[#0058AB] font-medium transition-colors"
              >
                Sell Your Furniture
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            className="text-gray-600"
            size="icon"
            whileHover={{ scale: 1.1 }}
            as={motion.button}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
