import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  BadgeCheck,
  Percent,
} from "lucide-react";
import { CartItem } from "@/types/marketplace";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("ikea_marketplace_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isFamilyMember, setIsFamilyMember] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    familyMemberNumber: "",
  });

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("ikea_marketplace_cart", JSON.stringify(newCart));
  };

  const updateQuantity = (itemId: string, change: number) => {
    const newCart = cart
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(newCart);
  };

  const removeItem = (itemId: string) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    updateCart(newCart);

    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
      variant: "default",
    });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 29.99 : 0;
  const tax = subtotal * 0.08875; // NYC tax rate
  const familyDiscount = isFamilyMember ? subtotal * 0.1 : 0; // 10% IKEA Family discount
  const total = subtotal + shipping + tax - familyDiscount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    if (isFamilyMember && !formData.familyMemberNumber) {
      toast({
        title: "IKEA Family Number Required",
        description: "Please enter your IKEA Family membership number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase",
      variant: "default",
    });

    updateCart([]);
    setTimeout(() => navigate("/marketplace"), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] pt-[80px]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Button
                  onClick={() => navigate("/marketplace")}
                  className="bg-[#0058AB] hover:bg-[#004f99]"
                >
                  Browse Marketplace
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.condition}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Checkout Form and Summary */}
          <div className="lg:w-[500px] space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {/* IKEA Family Section */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-4 my-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#0058AB]" />
                    <span className="font-medium">IKEA Family</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="familyMember"
                      checked={isFamilyMember}
                      onCheckedChange={(checked) =>
                        setIsFamilyMember(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="familyMember"
                      className="text-sm cursor-pointer"
                    >
                      I am an IKEA Family member
                    </label>
                  </div>
                  {isFamilyMember && (
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter IKEA Family number"
                        name="familyMemberNumber"
                        value={formData.familyMemberNumber}
                        onChange={handleInputChange}
                        className="text-sm"
                        required
                      />
                      <div className="flex justify-between text-green-600 font-medium">
                        <span className="flex items-center gap-1">
                          <Percent className="w-4 h-4" />
                          Family Discount
                        </span>
                        <span>-${familyDiscount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold">Payment Details</h2>

              {/* Card Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Billing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0058AB] hover:bg-[#004f99] text-white flex items-center justify-center gap-2 h-12 text-lg"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Place Order
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
