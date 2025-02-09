import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MarketplacePage from "./components/marketplace/MarketplacePage";
import SellPage from "./components/sell/SellPage";
import CartPage from "./components/marketplace/CartPage";
import ProductDetails from "./components/marketplace/ProductDetails";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:itemId" element={<ProductDetails />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </CartProvider>
  );
}

export default App;
