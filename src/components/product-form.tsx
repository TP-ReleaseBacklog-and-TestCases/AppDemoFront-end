import React from "react";
import { Card, CardBody, Input, Textarea, Select, SelectItem, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Product } from "./product-card";

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id" | "rating">) => void;
  onCancel: () => void;
}

const categories = [
  { value: "Electronics", label: "Electronics" },
  { value: "Books", label: "Books" },
  { value: "Clothing", label: "Clothing" },
  { value: "Home", label: "Home & Kitchen" },
  { value: "Sports", label: "Sports & Outdoors" },
];

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = React.useState(product?.name || "");
  const [description, setDescription] = React.useState(product?.description || "");
  const [price, setPrice] = React.useState(product?.price.toString() || "");
  const [category, setCategory] = React.useState(product?.category || "");
  const [stock, setStock] = React.useState(product?.stock.toString() || "");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    if (!stock.trim()) {
      newErrors.stock = "Stock is required";
    } else if (isNaN(Number(stock)) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      newErrors.stock = "Stock must be a non-negative integer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        image: product?.image || "",
      });
      setIsSubmitting(false);
    }, 1000);
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
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                isRequired
              />

              <Select
                label="Category"
                placeholder="Select a category"
                selectedKeys={category ? [category] : []}
                onChange={(e) => setCategory(e.target.value)}
                isInvalid={!!errors.category}
                errorMessage={errors.category}
                isRequired
              >
                {categories.map((cat) => (
                  <SelectItem key={cat.value}>
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
              isInvalid={!!errors.description}
              errorMessage={errors.description}
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
                isInvalid={!!errors.price}
                errorMessage={errors.price}
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
                isInvalid={!!errors.stock}
                errorMessage={errors.stock}
                isRequired
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="flat"
                onPress={onCancel}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isSubmitting}
                className="min-w-[100px]"
                startContent={!isSubmitting && <Icon icon="lucide:save" />}
              >
                {product ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};