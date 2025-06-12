import React from "react";
import { Input, Select, SelectItem, Slider, Button, Chip, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  sortBy: string;
}

interface SearchFiltersProps {
  onSearch: (keyword: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortOption: string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Electronics", label: "Electronics" },
  { value: "Books", label: "Books" },
  { value: "Clothing", label: "Clothing" },
  { value: "Home", label: "Home & Kitchen" },
  { value: "Sports", label: "Sports & Outdoors" },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Rating: High to Low" },
  { value: "newest", label: "Newest First" },
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, onFilterChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = React.useState("relevance");
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    updateActiveFilters();
  };

  const handleCategoryChange = (value: React.Key) => {
    setCategory(value as string);
    applyFilters(value as string, priceRange, sortBy);
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    applyFilters(category, range, sortBy);
  };

  const handleSortChange = (value: React.Key) => {
    setSortBy(value as string);
    onSortChange(value as string);
    updateActiveFilters();
  };

  const applyFilters = (cat: string, price: [number, number], sort: string) => {
    onFilterChange({
      category: cat,
      priceRange: price,
      sortBy: sort,
    });
    updateActiveFilters();
  };

  const updateActiveFilters = () => {
    const filters: string[] = [];

    if (searchTerm) {
      filters.push(`Search: ${searchTerm}`);
    }

    if (category !== "all") {
      filters.push(`Category: ${category}`);
    }

    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      filters.push(`Price: S/ ${priceRange[0]} - S/ ${priceRange[1]}`);
    }

    if (sortBy !== "relevance") {
      const sortLabel = sortOptions.find(opt => opt.value === sortBy)?.label;
      filters.push(`Sort: ${sortLabel}`);
    }

    setActiveFilters(filters);
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith("Search:")) {
      setSearchTerm("");
      onSearch("");
    } else if (filter.startsWith("Category:")) {
      setCategory("all");
      applyFilters("all", priceRange, sortBy);
    } else if (filter.startsWith("Price:")) {
      setPriceRange([0, 2000]);
      applyFilters(category, [0, 2000], sortBy);
    } else if (filter.startsWith("Sort:")) {
      setSortBy("relevance");
      onSortChange("relevance");
    }

    updateActiveFilters();
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setPriceRange([0, 2000]);
    setSortBy("relevance");
    onSearch("");
    onFilterChange({
      category: "all",
      priceRange: [0, 2000],
      sortBy: "relevance",
    });
    onSortChange("relevance");
    setActiveFilters([]);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <form onSubmit={handleSearch} className="flex-grow">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            endContent={
              searchTerm && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => {
                    setSearchTerm("");
                    onSearch("");
                    updateActiveFilters();
                  }}
                >
                  <Icon icon="lucide:x" className="text-default-400" />
                </Button>
              )
            }
            className="w-full"
          />
        </form>

        <div className="hidden md:flex items-center gap-2">
          <Select
            placeholder="Category"
            selectedKeys={[category]}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-40"
          >
            {categories.map((cat) => (
              <SelectItem key={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Sort by"
            selectedKeys={[sortBy]}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-48"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            variant="flat"
            onPress={() => setShowMobileFilters(!showMobileFilters)}
            startContent={<Icon icon="lucide:sliders" />}
          >
            More Filters
          </Button>
        </div>

        <div className="md:hidden flex justify-between w-full">
          <Button
            variant="flat"
            size="sm"
            onPress={() => setShowMobileFilters(!showMobileFilters)}
            startContent={<Icon icon="lucide:sliders" />}
          >
            Filters
          </Button>

          <Select
            placeholder="Sort by"
            selectedKeys={[sortBy]}
            onChange={(e) => handleSortChange(e.target.value)}
            size="sm"
            className="w-40"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 my-3">
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              onClose={() => removeFilter(filter)}
              variant="flat"
              color="primary"
              size="sm"
            >
              {filter}
            </Chip>
          ))}

          {activeFilters.length > 1 && (
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={clearAllFilters}
              className="ml-2"
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      {/* Expanded Filters */}
      {showMobileFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 bg-content1 rounded-lg shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <Select
                placeholder="Select category"
                selectedKeys={[category]}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full"
              >
                {categories.map((cat) => (
                  <SelectItem key={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  label="Price"
                  step={50}
                  minValue={0}
                  maxValue={2000}
                  value={priceRange}
                  onChange={handlePriceChange as (value: number | number[]) => void}
                  formatOptions={{ style: "currency", currency: "PEN", minimumFractionDigits: 0 }}
                  className="max-w-md"
                  showSteps
                  showTooltip
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-default-500">
                <span>S/ {priceRange[0]}</span>
                <span>S/ {priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Divider className="my-4" />

          <div className="flex justify-end">
            <Button
              color="danger"
              variant="light"
              onPress={clearAllFilters}
              className="mr-2"
            >
              Reset
            </Button>
            <Button
              color="primary"
              onPress={() => {
                setShowMobileFilters(false);
                applyFilters(category, priceRange, sortBy);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};