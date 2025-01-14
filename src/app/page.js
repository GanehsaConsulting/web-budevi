"use client";
import { Banner } from "@/components/Banner";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";
import { products } from "../../public/DB";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("cheapest"); // Default sorting
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState("All"); // New state for selected category

  const allProducts = products;

  // Filter products based on the search term and selected category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered products based on the sortCriteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria === "cheapest") {
      return a.priceIDR - b.priceIDR; // Sort by ascending price (low to high)
    } else if (sortCriteria === "expensive") {
      return b.priceIDR - a.priceIDR; // Sort by descending price (high to low)
    }
    return 0; // Default: No sorting applied
  });

  // Handle sorting changes
  const handleSort = (criteria) => {
    setSortCriteria(criteria); // Update sort criteria
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm(""); // Reset search term
    setSelectedCategory("All"); // Reset category to "All"
  };

  return (
    <>
      <Banner />
      <Filter
        onSearch={setSearchTerm}
        onSort={handleSort}
        onCategoryChange={handleCategoryChange}
        onResetFilters={handleResetFilters} // Pass reset function to Filter component
      />
      {sortedProducts.length === 0 ? (
        <div className="h-[30lvh] flex items-center justify-center">
          <p className="text-xl text-center">
            No product found for <span className="font-semibold text text-mainColor dark:text-mainColorD">{searchTerm}</span>. Please try a different search term.
          </p>
        </div>
      ) : (
        <Card
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          isSearching={!!searchTerm}
          products={sortedProducts}
        />
      )}
    </>
  );
}
