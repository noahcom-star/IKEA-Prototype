import React, { useState } from "react";
import Navbar from "../landing/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  X,
  Plus,
  Info,
  Tag,
  FileText,
  ScanLine,
  Package,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhotoUpload {
  file: File;
  preview: string;
  type: "product" | "label" | "manual" | "serial";
}

const SellPage = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    retailPrice: "",
    category: "",
    condition: "",
    material: "",
    assembly: "",
    location: "",
    width: "",
    height: "",
    depth: "",
    weight: "",
  });

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: PhotoUpload["type"],
  ) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        type,
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const getPhotosByType = (type: PhotoUpload["type"]) => {
    return photos.filter((p) => p.type === type);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productPhotos = getPhotosByType("product");
    const labelPhotos = getPhotosByType("label");
    const serialPhotos = getPhotosByType("serial");

    if (!formData.title || !formData.price || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (productPhotos.length < 3) {
      toast({
        title: "More Photos Required",
        description: "Please upload at least 3 photos of your item",
        variant: "destructive",
      });
      return;
    }

    if (!labelPhotos.length || !serialPhotos.length) {
      toast({
        title: "Verification Photos Required",
        description: "Please upload both label and serial number photos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Item Listed Successfully",
      description: "Your item has been submitted for verification",
    });
  };

  const PhotoUploadSection = ({
    type,
    multiple = false,
  }: {
    type: PhotoUpload["type"];
    multiple?: boolean;
  }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {getPhotosByType(type).map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square"
        >
          <img
            src={photo.preview}
            alt={`${type} photo ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => removePhoto(index)}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-red-50"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </motion.div>
      ))}
      {(multiple || getPhotosByType(type).length === 0) && (
        <label className="relative aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#0058AB] transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => handlePhotoUpload(e, type)}
            className="hidden"
          />
          <Plus className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500 mt-2">Add Photo</span>
        </label>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] pt-[80px]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Sell Your Furniture</h1>
          <p className="text-gray-600 mb-8">
            List your IKEA furniture and find it a new home
          </p>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="details" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Item Details</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-8">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Item Title*</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="e.g., MALM Bed Frame"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category*</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="Bedroom">Bedroom</option>
                          <option value="Living Room">Living Room</option>
                          <option value="Storage">Storage</option>
                          <option value="Dining">Dining</option>
                          <option value="Office">Office</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description*</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your item's condition, history, and any important details"
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">Selling Price ($)*</Label>
                        <Input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="retailPrice">
                          Original Retail Price ($)
                        </Label>
                        <Input
                          type="number"
                          id="retailPrice"
                          name="retailPrice"
                          value={formData.retailPrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition*</Label>
                        <select
                          id="condition"
                          name="condition"
                          value={formData.condition}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          required
                        >
                          <option value="">Select condition</option>
                          <option value="Like New">Like New</option>
                          <option value="Good">Good</option>
                          <option value="Fair">Fair</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assembly">Assembly Required*</Label>
                        <select
                          id="assembly"
                          name="assembly"
                          value={formData.assembly}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          required
                        >
                          <option value="">Select option</option>
                          <option value="Required">Required</option>
                          <option value="Not Required">Not Required</option>
                          <option value="Pre-Assembled">Pre-Assembled</option>
                        </select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Dimensions & Weight</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="width">Width (cm)*</Label>
                          <Input
                            type="number"
                            id="width"
                            name="width"
                            value={formData.width}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)*</Label>
                          <Input
                            type="number"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="depth">Depth (cm)*</Label>
                          <Input
                            type="number"
                            id="depth"
                            name="depth"
                            value={formData.depth}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)*</Label>
                          <Input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="material">Material*</Label>
                      <Input
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        placeholder="e.g., Solid Pine, Oak Veneer"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location*</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Brooklyn, NY"
                        required
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Product Photos*</h2>
                    <span className="text-sm text-gray-500">
                      Upload at least 3 photos
                    </span>
                  </div>
                  <PhotoUploadSection type="product" multiple />
                </Card>
              </TabsContent>

              <TabsContent value="verification" className="space-y-6">
                <Card className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-[#0058AB]" />
                    <div>
                      <h3 className="font-semibold text-lg">Product Label*</h3>
                      <p className="text-sm text-gray-500">
                        Take a clear photo of the IKEA product label
                      </p>
                    </div>
                  </div>
                  <PhotoUploadSection type="label" />
                </Card>

                <Card className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <ScanLine className="w-5 h-5 text-[#0058AB]" />
                    <div>
                      <h3 className="font-semibold text-lg">Serial Number*</h3>
                      <p className="text-sm text-gray-500">
                        Capture the serial number or barcode
                      </p>
                    </div>
                  </div>
                  <PhotoUploadSection type="serial" />
                </Card>

                <Card className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#0058AB]" />
                    <div>
                      <h3 className="font-semibold text-lg">Assembly Manual</h3>
                      <p className="text-sm text-gray-500">
                        Optional: Include photos of assembly instructions
                      </p>
                    </div>
                  </div>
                  <PhotoUploadSection type="manual" multiple />
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-[#0058AB] hover:bg-[#004f99] text-white h-12 text-lg"
              >
                List Item for Verification
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellPage;
