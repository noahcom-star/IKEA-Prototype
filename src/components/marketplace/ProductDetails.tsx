import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  Package,
  Truck,
  Award,
} from "lucide-react";
import { MarketplaceItem } from "@/types/marketplace";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  searchItems,
  addToCart,
  toggleFavorite,
  getFavorites,
} from "@/lib/marketplace";
import { useToast } from "@/components/ui/use-toast";

const ProductDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  useEffect(() => {
    if (itemId) {
      const foundItem = searchItems("").find((i) => i.id === itemId);
      setItem(foundItem || null);
    }
  }, [itemId]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item);
      toast({
        title: "Added to Cart",
        description: `${item.title} has been added to your cart`,
      });
    }
  };

  const handleToggleFavorite = () => {
    if (item) {
      toggleFavorite(item.id);
      setFavorites(getFavorites());

      toast({
        title: favorites.includes(item.id)
          ? "Removed from Favorites"
          : "Added to Favorites",
        description: favorites.includes(item.id)
          ? "Item has been removed from your favorites"
          : "Item has been added to your favorites",
      });
    }
  };

  if (!item) return null;

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 py-8 pt-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {item.images.map((image, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt={`${item.title} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            {item.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => emblaApi?.scrollNext()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-[#0058AB] text-white">
                  {item.condition}
                </Badge>
                {item.retailPrice > item.price && (
                  <Badge
                    className="bg-[#FBD914] text-black font-medium"
                    variant="secondary"
                  >
                    {Math.round(
                      ((item.retailPrice - item.price) / item.retailPrice) *
                        100,
                    )}
                    % OFF
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-[#0058AB]">
                  ${item.price}
                </span>
                {item.retailPrice > item.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${item.retailPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.sellerName}`}
                  />
                  <AvatarFallback>{item.sellerName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{item.sellerName}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    4.9 · 24 reviews
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{item.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Listed {new Date(item.listedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-[#0058AB] hover:bg-[#004f99]"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleToggleFavorite}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {favorites.includes(item.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            <Separator />

            {/* IKEA Authentication Report */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0058AB] rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    IKEA Authentication Report
                  </h3>
                  <p className="text-sm text-gray-600">
                    Verified on {new Date(item.listedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Product Verification */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">
                      Product Verification
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        Original IKEA Product
                      </li>
                      <li className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        Serial Number Authenticated
                      </li>
                      <li className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        Quality Inspection Passed
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Seller Verification */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">
                      Seller Verification
                    </h4>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.sellerName}`}
                          />
                          <AvatarFallback>{item.sellerName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.sellerName}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            4.9 · 24 reviews
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Verified IKEA Family member since 2022
                        <br />
                        12 successful sales
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <Package className="w-5 h-5 text-[#0058AB] mx-auto mb-2" />
                  <p className="text-xs font-medium">Quality Guaranteed</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <Truck className="w-5 h-5 text-[#0058AB] mx-auto mb-2" />
                  <p className="text-xs font-medium">Secure Delivery</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <Award className="w-5 h-5 text-[#0058AB] mx-auto mb-2" />
                  <p className="text-xs font-medium">Buyer Protection</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Specifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Material:</span>
                  <span className="ml-2">{item.material}</span>
                </div>
                <div>
                  <span className="text-gray-500">Assembly:</span>
                  <span className="ml-2">{item.assembly}</span>
                </div>
                <div>
                  <span className="text-gray-500">Dimensions:</span>
                  <span className="ml-2">
                    {item.dimensions.width}W × {item.dimensions.height}H ×{" "}
                    {item.dimensions.depth}D cm
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Weight:</span>
                  <span className="ml-2">{item.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
