import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ProductCard, Product } from "../components/product-card";

const featuredProducts: Product[] = [
  {
    id: "prod1",
    name: "Premium Laptop Pro",
    description: "High-performance laptop with the latest processor and stunning display.",
    price: 1899,
    rating: 4.8,
    category: "Electronics",
    image: "laptop",
    stock: 15
  },
  {
    id: "prod2",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Experience crystal-clear sound with these premium wireless headphones.",
    price: 299,
    rating: 4.7,
    category: "Electronics",
    image: "headphones",
    stock: 32
  },
  {
    id: "prod3",
    name: "Modern Design Chair",
    description: "Ergonomic chair with stylish design perfect for your home office.",
    price: 159,
    rating: 4.5,
    category: "Furniture",
    image: "furniture",
    stock: 8
  },
  {
    id: "prod4",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos with this high-resolution professional camera.",
    price: 899,
    rating: 4.9,
    category: "Electronics",
    image: "camera",
    stock: 5
  }
];

const categories = [
  { name: "Electronics", icon: "lucide:cpu", color: "primary" },
  { name: "Books", icon: "lucide:book", color: "success" },
  { name: "Clothing", icon: "lucide:shirt", color: "secondary" },
  { name: "Home & Kitchen", icon: "lucide:sofa", color: "warning" },
  { name: "Sports & Outdoors", icon: "lucide:dumbbell", color: "danger" }
];

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h1>
              <p className="text-lg mb-6">Find everything you need at the best prices with our curated selection of top-quality products.</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  as={RouterLink}
                  to="/explore"
                  color="default"
                  variant="solid"
                  size="lg"
                  startContent={<Icon icon="lucide:search" />}
                >
                  Explore Now
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  variant="flat"
                  color="default"
                  size="lg"
                >
                  Join Us
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://img.heroui.chat/image/dashboard?w=600&h=400&u=homepage-hero"
                alt="Shopping Experience"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-default-500">Browse our wide selection of products by category</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  isPressable
                  as={RouterLink}
                  to={`/explore?category=${category.name}`}
                  className="h-full"
                >
                  <CardBody className="flex flex-col items-center justify-center p-6 text-center">
                    <div className={`rounded-full p-4 bg-${category.color}-100 mb-4`}>
                      <Icon icon={category.icon} className={`text-${category.color} text-2xl`} />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Button
              as={RouterLink}
              to="/explore"
              variant="light"
              color="primary"
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-default-500">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: item * 0.1 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} icon="lucide:star" className="text-warning" />
                      ))}
                    </div>
                    <p className="mb-6 text-default-600">
                      "The quality of products on this marketplace is exceptional. I've been a loyal customer for years and have never been disappointed."
                    </p>
                    <Divider className="my-4" />
                    <div className="flex items-center">
                      <img
                        src={`https://img.heroui.chat/image/avatar?w=40&h=40&u=user${item}`}
                        alt="Customer"
                        className="rounded-full w-10 h-10 mr-3"
                      />
                      <div>
                        <p className="font-semibold">Customer {item}</p>
                        <p className="text-sm text-default-500">Verified Buyer</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary-900 to-primary-700 text-white overflow-hidden">
            <CardBody className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Ready to Start Shopping?</h2>
                  <p className="text-white/80 mb-4">Join thousands of satisfied customers today.</p>
                  <div className="flex gap-3">
                    <Button
                      as={RouterLink}
                      to="/explore"
                      color="default"
                      variant="solid"
                      size="lg"
                    >
                      Explore Products
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/register"
                      variant="bordered"
                      color="default"
                      size="lg"
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
                <img
                  src="https://img.heroui.chat/image/shopping?w=300&h=200&u=cta-section"
                  alt="Shopping"
                  className="rounded-lg w-full md:w-auto md:max-w-[300px]"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};