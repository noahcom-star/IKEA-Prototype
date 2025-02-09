import {
  MarketplaceItem,
  SearchFilters,
  CartItem,
  ChatMessage,
} from "@/types/marketplace";

// Simulated marketplace data
const mockItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "MALM Bed Frame",
    description: "Queen size bed frame in excellent condition, includes slats",
    price: 199,
    retailPrice: 299,
    dimensions: { width: 152, height: 38, depth: 209 },
    material: "Oak veneer",
    category: "Bedroom",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    ],
    location: "Brooklyn, NY",
    sellerName: "Sarah M.",
    listedDate: "2024-03-15",
    assembly: "Required",
    weight: "63 kg",
  },
  {
    id: "2",
    title: "POÄNG Armchair",
    description: "Classic armchair with beige cushions, minimal wear",
    price: 89,
    retailPrice: 149,
    dimensions: { width: 68, height: 100, depth: 82 },
    material: "Birch veneer, Cotton",
    category: "Living Room",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    ],
    location: "Manhattan, NY",
    sellerName: "Mike R.",
    listedDate: "2024-03-18",
    assembly: "Required",
    weight: "7 kg",
  },
  {
    id: "3",
    title: "BILLY Bookcase",
    description:
      "White bookcase, adjustable shelves, perfect for books or display",
    price: 49,
    retailPrice: 79,
    dimensions: { width: 80, height: 202, depth: 28 },
    material: "Particleboard, Paper foil",
    category: "Storage",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1594123071580-83c8495e14c3?w=800",
      "https://images.unsplash.com/photo-1592247350271-c5efb34dd967?w=800",
      "https://images.unsplash.com/photo-1592247350765-c6c0f8b1b801?w=800",
    ],
    location: "Queens, NY",
    sellerName: "Alex K.",
    listedDate: "2024-03-20",
    assembly: "Required",
    weight: "28 kg",
  },
  {
    id: "4",
    title: "KALLAX Shelf Unit",
    description: "8-cube storage unit, perfect for vinyl records",
    price: 79,
    retailPrice: 109,
    dimensions: { width: 77, height: 147, depth: 39 },
    material: "Particleboard, Fiberboard",
    category: "Storage",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=800",
      "https://images.unsplash.com/photo-1593085260707-5377ba37f868?w=800",
    ],
    location: "Brooklyn, NY",
    sellerName: "Emma S.",
    listedDate: "2024-03-21",
    assembly: "Required",
    weight: "33 kg",
  },
  {
    id: "5",
    title: "KIVIK Sofa",
    description: "3-seat sofa with chaise, dark gray, very comfortable",
    price: 499,
    retailPrice: 799,
    dimensions: { width: 280, height: 83, depth: 95 },
    material: "Fabric, Wood",
    category: "Living Room",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
    ],
    location: "Jersey City, NJ",
    sellerName: "David L.",
    listedDate: "2024-03-19",
    assembly: "Required",
    weight: "95 kg",
  },
  {
    id: "6",
    title: "HEMNES Dresser",
    description: "6-drawer dresser, white stain, solid wood",
    price: 159,
    retailPrice: 249,
    dimensions: { width: 108, height: 130, depth: 50 },
    material: "Solid Pine",
    category: "Bedroom",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
      "https://images.unsplash.com/photo-1595428774181-739d04114a76?w=800",
    ],
    location: "Hoboken, NJ",
    sellerName: "Lisa P.",
    listedDate: "2024-03-17",
    assembly: "Required",
    weight: "55 kg",
  },
];

// Automated responses for the chat
const automatedResponses = [
  "Hi! Thanks for your interest. When would you like to see the item?",
  "The item is still available! Would you like to schedule a viewing?",
  "I'm available for viewings this week. What time works best for you?",
  "Great! I can meet at the local IKEA store for the handover.",
  "The condition is exactly as described in the listing. Let me know if you have any specific questions!",
  "Yes, I can hold it for you until tomorrow. Let me know what time works for pickup.",
  "The measurements are exactly as listed in the description. It should fit your space perfectly!",
  "I can help with delivery if needed. There would be a small additional fee.",
];

const getAutomatedResponse = () => {
  return automatedResponses[
    Math.floor(Math.random() * automatedResponses.length)
  ];
};

// Search functionality
export const searchItems = (query: string, filters: SearchFilters = {}) => {
  let filteredItems = [...mockItems];

  if (query) {
    const searchTerms = query.toLowerCase().split(" ");
    filteredItems = filteredItems.filter((item) =>
      searchTerms.every(
        (term) =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term),
      ),
    );
  }

  if (filters.category) {
    filteredItems = filteredItems.filter(
      (item) => item.category.toLowerCase() === filters.category?.toLowerCase(),
    );
  }

  if (filters.condition) {
    filteredItems = filteredItems.filter(
      (item) => item.condition === filters.condition,
    );
  }

  if (filters.minPrice !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.price >= filters.minPrice!,
    );
  }

  if (filters.maxPrice !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.price <= filters.maxPrice!,
    );
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_asc":
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case "date_desc":
        filteredItems.sort(
          (a, b) =>
            new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime(),
        );
        break;
      case "discount_desc":
        filteredItems.sort(
          (a, b) =>
            (b.retailPrice - b.price) / b.retailPrice -
            (a.retailPrice - a.price) / a.retailPrice,
        );
        break;
    }
  }

  return filteredItems;
};

// Cart functionality
const CART_STORAGE_KEY = "ikea_marketplace_cart";

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: MarketplaceItem) => {
  const cart = getCart();
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Favorites functionality
const FAVORITES_STORAGE_KEY = "ikea_marketplace_favorites";

export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const toggleFavorite = (itemId: string) => {
  const favorites = getFavorites();
  const index = favorites.indexOf(itemId);

  if (index === -1) {
    favorites.push(itemId);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

// Chat functionality
const CHAT_STORAGE_KEY = "ikea_marketplace_chats";

const getAllChats = (): ChatMessage[] => {
  const chats = localStorage.getItem(CHAT_STORAGE_KEY);
  return chats ? JSON.parse(chats) : [];
};

export const getChatMessages = (itemId: string): ChatMessage[] => {
  const chats = getAllChats();
  return chats.filter((m: ChatMessage) => m.itemId === itemId);
};

export const sendMessage = (
  senderId: string,
  receiverId: string,
  message: string,
  itemId?: string,
): ChatMessage => {
  const newMessage = {
    id: Math.random().toString(36).substr(2, 9),
    senderId,
    receiverId,
    message,
    itemId,
    timestamp: new Date().toISOString(),
  };

  const chats = getAllChats();
  chats.push(newMessage);
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));

  return newMessage;
};

export const simulateSellerResponse = (
  itemId: string,
  buyerId: string,
): ChatMessage => {
  const response = getAutomatedResponse();
  return sendMessage("seller", buyerId, response, itemId);
};
