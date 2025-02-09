export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  retailPrice: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  category: string;
  condition: "Like New" | "Good" | "Fair";
  images: string[];
  location: string;
  sellerName: string;
  listedDate: string;
  assembly: string;
  weight: string;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  location?: string;
  sortBy?: "price_asc" | "price_desc" | "date_desc" | "discount_desc";
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  itemId?: string;
}

export interface CartItem extends MarketplaceItem {
  quantity: number;
}
