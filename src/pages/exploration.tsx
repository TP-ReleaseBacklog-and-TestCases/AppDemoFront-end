import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { SearchFilters } from "../components/search-filters";
import { ProductCard, Product } from "../components/product-card";
import { PaginationControl } from "../components/pagination-control";
import { CATEGORY_IMAGES } from "../constants/categoryImages";

// Mock data generator
const generateMockProducts = (count: number): Product[] => {
  const categories = ["Electronics", "Books", "Clothing", "Home", "Sports"];
  const products: Product[] = [];

  for (let i = 1; i <= count; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const price = Math.floor(Math.random() * 1900) + 100;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const stock = Math.floor(Math.random() * 100) + 1;

    products.push({
      id: `prod${i}`,
      name: `Product ${i}`,
      description: `This is a detailed description for product ${i}. It contains all the important information about features and specifications.`,
      price,
      rating: parseFloat(rating),
      category: categories[categoryIndex],
      image: CATEGORY_IMAGES[categories[categoryIndex].toLowerCase()],
      stock
    });
  }

  return products;
};

const allProducts = generateMockProducts(40);

export const ExplorationPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(allProducts);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [category, setCategory] = React.useState(initialCategory);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = React.useState("relevance");

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleSearch = (keyword: string) => {
    setIsLoading(true);
    setSearchTerm(keyword);
    setCurrentPage(1);

    // Simulate API call delay
    setTimeout(() => {
      applyFilters(keyword, category, priceRange, sortOption);
      setIsLoading(false);
    }, 500);
  };

  const handleFilterChange = (filters: { category: string; priceRange: [number, number]; sortBy: string }) => {
    setIsLoading(true);
    setCategory(filters.category);
    setPriceRange(filters.priceRange);
    setSortOption(filters.sortBy);
    setCurrentPage(1);

    // Simulate API call delay
    setTimeout(() => {
      applyFilters(searchTerm, filters.category, filters.priceRange, filters.sortBy);
      setIsLoading(false);
    }, 500);
  };

  const handleSortChange = (sortBy: string) => {
    setIsLoading(true);
    setSortOption(sortBy);

    // Simulate API call delay
    setTimeout(() => {
      applyFilters(searchTerm, category, priceRange, sortBy);
      setIsLoading(false);
    }, 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyFilters = (search: string, cat: string, price: [number, number], sort: string) => {
    let results = [...allProducts];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (cat !== "all") {
      results = results.filter((product) => product.category === cat);
    }

    // Apply price filter
    results = results.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    // Apply sorting
    switch (sort) {
      case "price_asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // In a real app, you would sort by date
        results.sort((a, b) => parseInt(b.id.replace("prod", "")) - parseInt(a.id.replace("prod", "")));
        break;
      default:
        // relevance - no specific sorting
        break;
    }

    setFilteredProducts(results);
  };

  // Initialize with any URL parameters
  React.useEffect(() => {
    if (initialCategory !== "all") {
      handleFilterChange({
        category: initialCategory,
        priceRange,
        sortBy: sortOption,
      });
    }
  }, []);

  const currentProducts = getCurrentPageProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Explore Products</h1>
        <p className="text-default-500">
          Browse our collection of products and find exactly what you need
        </p>
      </div>

      <SearchFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" color="primary" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <Icon icon="lucide:search-x" className="text-default-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-default-500">
              We couldn't find any products matching your search criteria.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <p className="text-default-500 mb-4">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};