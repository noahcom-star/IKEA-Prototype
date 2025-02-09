import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChatDialog from "./ChatDialog";
import Navbar from "@/components/landing/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  SlidersHorizontal,
  MessageCircle,
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowUpDown,
  Check,
  ChevronDown,
  Filter,
  MapPin,
  Tag,
  Package,
  Star,
  BadgeCheck,
} from "lucide-react";
import {
  searchItems,
  addToCart,
  getCart,
  toggleFavorite,
  getFavorites,
} from "@/lib/marketplace";
import { MarketplaceItem, SearchFilters, CartItem } from "@/types/marketplace";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [items, setItems] = useState<MarketplaceItem[]>(() => searchItems(""));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(
    null,
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const favoriteItems = useMemo(
    () => items.filter((item) => favorites.includes(item.id)),
    [items, favorites],
  );

  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
      setIsLoading(true);
      setItems(searchItems(searchFromUrl, filters));
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setItems(searchItems(query, { ...filters }));
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setIsLoading(true);
    setItems(searchItems(searchQuery, updatedFilters));
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleAddToCart = (item: MarketplaceItem) => {
    addToCart(item);
    setCart(getCart());
    toast({
      title: "Added to Cart",
      description: `${item.title} has been added to your cart`,
    });
  };

  const handleToggleFavorite = (itemId: string) => {
    const isFavorited = favorites.includes(itemId);
    toggleFavorite(itemId);
    setFavorites(getFavorites());

    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited
        ? "Item has been removed from your favorites"
        : "Item has been added to your favorites",
    });
  };

  const handleChatClick = (e: React.MouseEvent, item: MarketplaceItem) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsChatOpen(true);
  };

  const FilterSection = ({ title, icon, children }: any) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-white pt-[80px]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Header and Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Browse Marketplace</h1>
            <p className="text-gray-600">
              Discover pre-loved IKEA furniture in your area
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0058AB] text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              className="relative"
              onClick={() => setIsFavoritesOpen(true)}
            >
              <Heart
                className={`w-5 h-5 ${favorites.length > 0 ? "fill-red-500 text-red-500" : ""}`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(true)}
              className="gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
              {Object.keys(filters).length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 bg-[#0058AB] text-white"
                >
                  {Object.keys(filters).length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search for furniture..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse"
                >
                  <div className="h-[300px] bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))
            : items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="overflow-hidden border border-gray-200 hover:border-[#0058AB] transition-all duration-300 hover:shadow-lg">
                    <div
                      className="relative h-[300px] overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/marketplace/${item.id}`)}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {item.retailPrice > item.price && (
                          <Badge
                            className="bg-[#FBD914] text-black font-medium"
                            variant="secondary"
                          >
                            {Math.round(
                              ((item.retailPrice - item.price) /
                                item.retailPrice) *
                                100,
                            )}
                            % OFF
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg py-1 px-2">
                        <BadgeCheck className="w-4 h-4 text-[#0058AB]" />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-semibold text-lg mb-1 group-hover:text-[#0058AB] transition-colors cursor-pointer"
                        onClick={() => navigate(`/marketplace/${item.id}`)}
                      >
                        {item.title}
                      </h3>

                      {/* Seller Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.sellerName}`}
                          />
                          <AvatarFallback>{item.sellerName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <span>{item.sellerName}</span>
                          <span>•</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>4.9</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold text-[#0058AB]">
                          ${item.price}
                        </span>
                        {item.retailPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.retailPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleAddToCart(item)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleToggleFavorite(item.id)}
                          >
                            <Heart
                              className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => handleChatClick(e, item)}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
        </div>

        {/* Chat Dialog */}
        {selectedItem && (
          <ChatDialog
            item={selectedItem}
            open={isChatOpen}
            onOpenChange={setIsChatOpen}
          />
        )}

        {/* Filters Drawer */}
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search results</SheetDescription>
            </SheetHeader>

            <div className="mt-8 space-y-6">
              <FilterSection
                title="Price Range"
                icon={<Tag className="w-5 h-5 text-gray-500" />}
              >
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </FilterSection>

              <FilterSection
                title="Category"
                icon={<Package className="w-5 h-5 text-gray-500" />}
              >
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={filters.category || ""}
                  onChange={(e) =>
                    handleFilterChange({ category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Storage">Storage</option>
                  <option value="Dining">Dining</option>
                </select>
              </FilterSection>

              <FilterSection
                title="Condition"
                icon={<Star className="w-5 h-5 text-gray-500" />}
              >
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={filters.condition || ""}
                  onChange={(e) =>
                    handleFilterChange({ condition: e.target.value })
                  }
                >
                  <option value="">Any Condition</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </FilterSection>
            </div>
          </SheetContent>
        </Sheet>

        {/* Cart Drawer */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
              <SheetDescription>
                {cart.length} items in your cart
              </SheetDescription>
            </SheetHeader>

            <div className="mt-8 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}

              {cart.length > 0 && (
                <Button
                  className="w-full bg-[#0058AB] hover:bg-[#004f99]"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Favorites Drawer */}
        <Sheet open={isFavoritesOpen} onOpenChange={setIsFavoritesOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Saved Items</SheetTitle>
              <SheetDescription>
                {favoriteItems.length} items saved
              </SheetDescription>
            </SheetHeader>

            <div className="mt-8 space-y-4">
              {favoriteItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No saved items</p>
                </div>
              ) : (
                favoriteItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
};

export default MarketplacePage;
