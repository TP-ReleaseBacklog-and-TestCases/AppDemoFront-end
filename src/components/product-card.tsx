import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody, Button, Chip, Link, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { CATEGORY_IMAGES } from "../constants/categoryImages";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const hoverTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimer.current = setTimeout(() => {
      setShowPreview(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };

  return (
    <Card
      isPressable
      className="product-card overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardBody className="p-0 overflow-visible">
        <div className="relative">
          <img
            src={CATEGORY_IMAGES[product.image] || product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Chip color="primary" variant="flat" size="sm">{product.category}</Chip>
          </div>

          {/* Quick Preview Overlay */}
          {showPreview && (
            <motion.div
              className="quick-preview absolute inset-0 bg-background/80 p-4 flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <h3 className="text-md font-semibold">{product.name}</h3>
                <p className="text-sm text-default-500 line-clamp-3 mt-1">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < Math.floor(product.rating) ? "lucide:star" : "lucide:star"}
                        className={i < Math.floor(product.rating) ? "text-warning" : "text-default-300"}
                        width={16}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-default-500">({product.rating})</span>
                </div>
                <span className="text-xs text-default-500">{product.stock} in stock</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <Link
              as={RouterLink}
              to={`/product/${product.id}`}
              className="text-foreground font-medium line-clamp-1"
            >
              {product.name}
            </Link>
            <span className="font-semibold text-primary">S/ {product.price}</span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
              <Icon icon="lucide:star" className="text-warning mr-1" width={14} />
              <span className="text-sm">{product.rating}</span>
            </div>

            <div className="hover-actions flex space-x-1">
              <Tooltip content="Add to cart">
                <Button isIconOnly size="sm" variant="flat" color="primary" className="text-sm">
                  <Icon icon="lucide:shopping-cart" width={16} />
                </Button>
              </Tooltip>
              <Tooltip content="Add to wishlist">
                <Button isIconOnly size="sm" variant="flat" className="text-sm">
                  <Icon icon="lucide:heart" width={16} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};