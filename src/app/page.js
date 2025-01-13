"use client"
import { Banner } from "@/components/Banner";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";
import { products } from "../../public/DB";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("cheapest"); // Default sorting
  const [visibleCount, setVisibleCount] = useState(6);

  const allProducts = products;

  // Filter articles based on the search term
  const filteredProducts = allProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered articles based on the sortCriteria
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
  return (
    <>
      <Banner />
      <Filter
        onSearch={setSearchTerm}
        onSort={handleSort}
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
