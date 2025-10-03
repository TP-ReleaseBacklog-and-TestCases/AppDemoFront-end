import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { SearchFilters } from "../components/search-filters";
import { ProductCard, Product } from "../components/product-card";
import { PaginationControl } from "../components/pagination-control";
import { CATEGORY_IMAGES } from "../constants/categoryImages";
import { useLanguage } from "../context/language-context";

export const ExplorationPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "all";
  const { t } = useLanguage();

  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [category, setCategory] = React.useState(initialCategory);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = React.useState("relevance");

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Fetch products from backend
  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://backendecommerce-production-fd6f.up.railway.app/products/status/ACTIVE")
      .then(res => res.json())
      .then(data => {
        // Map backend data to Product interface
        const mapped = data.map((item: any) => ({
          id: String(item.id),
          name: item.name,
          description: item.description ?? "",
          price: item.price,
          rating: item.rating ?? 0,
          category: item.category ?? "",
          image: item.imageUrl,
          stock: item.stock ?? 0,
        }));
        setAllProducts(mapped);
        setIsLoading(false);
      })
      .catch(() => {
        setAllProducts([]);
        setIsLoading(false);
      });
  }, []);

  // Apply filters when products, search, category, price, or sort change
  React.useEffect(() => {
    applyFilters(searchTerm, category, priceRange, sortOption);
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [allProducts, searchTerm, category, priceRange, sortOption]);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleSearch = (keyword: string) => {
    setSearchTerm(keyword);
  };

  const handleFilterChange = (filters: { category: string; priceRange: [number, number]; sortBy: string }) => {
    setCategory(filters.category);
    setPriceRange(filters.priceRange);
    setSortOption(filters.sortBy);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function applyFilters(
    search: string,
    cat: string,
    price: [number, number],
    sort: string
  ) {
    let results = [...allProducts];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (cat !== "all") {
      results = results.filter((product) => product.category === cat);
    }

    // Price filter
    results = results.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    // Sorting
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
      default:
        break;
    }

    setFilteredProducts(results);
  }

  const currentProducts = getCurrentPageProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("exploreProductsTitle")}</h1>
        <p className="text-default-500">
          {t("exploreProductsDescription")}
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
            <h3 className="text-xl font-semibold mb-2">{t("noProductsTitle")}</h3>
            <p className="text-default-500">
              {t("noProductsDescription")}
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <p className="text-default-500 mb-4">
            {t("showingResults")} {currentProducts.length} {t("of")} {filteredProducts.length} {t("products")}
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