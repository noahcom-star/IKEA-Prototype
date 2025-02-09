import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, Send, CheckCheck } from "lucide-react";
import { MarketplaceItem, ChatMessage } from "@/types/marketplace";

interface ChatDialogProps {
  item: MarketplaceItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatDialog = ({ item, open, onOpenChange }: ChatDialogProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Math.random().toString(),
        senderId: "buyer",
        receiverId: "seller",
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      setIsTyping(true);
      setTimeout(() => {
        const response = {
          id: Math.random().toString(),
          senderId: "seller",
          receiverId: "buyer",
          message:
            "Hi! Thanks for your interest. When would you like to see the item?",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.sellerName}`}
              />
              <AvatarFallback>{item.sellerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{item.sellerName}</h3>
              <p className="text-sm text-gray-500">
                Usually responds within 1 hour
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-4" />

        {/* Item Preview */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h4 className="font-medium text-sm">{item.title}</h4>
            <p className="text-[#0058AB] font-bold">${item.price}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 bg-gray-50 rounded-lg space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === "buyer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${msg.senderId === "buyer" ? "bg-[#0058AB] text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"}`}
              >
                <p className="text-sm">{msg.message}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-xs ${msg.senderId === "buyer" ? "text-blue-100" : "text-gray-500"}`}
                >
                  <Clock className="w-3 h-3" />
                  {formatMessageTime(msg.timestamp)}
                  {msg.senderId === "buyer" && (
                    <CheckCheck className="w-3 h-3 ml-1" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="resize-none rounded-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            className="bg-[#0058AB] hover:bg-[#004f99] px-4 rounded-xl"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
