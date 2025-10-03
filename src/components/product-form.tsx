import React from "react";
import { Card, CardBody, Input, Textarea, Select, SelectItem, Button, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Product } from "./product-card";
import { useLanguage } from "../context/language-context";
import { useAuth } from "../context/auth-context";

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: {
    userId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
  }) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [name, setName] = React.useState(product?.name || "");
  const [description, setDescription] = React.useState(product?.description || "");
  const [price, setPrice] = React.useState(product?.price.toString() || "");
  const [stock, setStock] = React.useState(product?.stock?.toString() || "");
  const [category, setCategory] = React.useState(product?.category || "ELECTRONIC");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState(product?.image || "");
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const { t } = useLanguage();

  const categories = [
    { value: "ELECTRONIC", label: t("ELECTRONIC") },
    { value: "FASHION", label: t("FASHION") },
    { value: "CLOTHING", label: t("CLOTHING") },
    { value: "HOME", label: t("HOME") },
    { value: "SPORTS", label: t("SPORTS") },
  ];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) throw new Error("No image selected");

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch("https://backendecommerce-production-fd6f.up.railway.app/files/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const imageUrl = await response.text(); // Devuelve string, no JSON
    setIsUploadingImage(false);
    return imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = product?.image || "";

      // Si hay nueva imagen, subirla primero
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const productData = {
        userId: user?.id || 0,
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        imageUrl,
      };

      onSubmit(productData);
    } catch (error) {
      console.error("Error:", error);
      // Mostrar error al usuario
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {product ? "Edit Product" : "Add New Product"}
          </h2>

          <Divider className="my-4" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                placeholder="Enter product name"
                value={name}
                onValueChange={setName}
                isRequired
              />

              <Select
                label="Category"
                placeholder="Select a category"
                selectedKeys={[category]}
                onSelectionChange={(keys) => setCategory(Array.from(keys)[0] as string)}
                isRequired
              >
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Textarea
              label="Description"
              placeholder="Enter product description"
              value={description}
              onValueChange={setDescription}
              isRequired
              minRows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price (S/)"
                placeholder="0.00"
                value={price}
                onValueChange={setPrice}
                startContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">S/</span></div>}
                type="number"
                min="0"
                step="0.01"
                isRequired
              />

              <Input
                label="Stock"
                placeholder="0"
                value={stock}
                onValueChange={setStock}
                type="number"
                min="0"
                step="1"
                isRequired
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Imagen del producto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="flat"
                onPress={onCancel}
                className="min-w-[100px]"
              >
                {t("cancel")}
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isUploadingImage}
                className="min-w-[100px]"
                startContent={!isUploadingImage && <Icon icon="lucide:save" />}
              >
                {product ? t("update") : t("create")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};