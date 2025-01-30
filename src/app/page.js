"use client";
import { Banner } from "@/components/Banner";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";
import { useState } from "react";
import { SwitchView } from "@/components/SwitchView";
import { products } from "../../public/DB";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Default sorting
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedCategories, setSelectedCategories] = useState([]); // Multi-category selection
  const [toggle, setToggle] = useState(1);

  // Fungsi untuk update toggle
  function updateToggle(id) {
    setToggle(id);
  }

  // Search Bar
  const filteredProducts = products.filter((p) => {
    const search = searchTerm.toLowerCase();
    if (p.productName.toLowerCase().includes(search)) return true;
    if (p.category.toLowerCase().includes(search)) return true;
    if (p.variants.some(v => v.name.toLowerCase().includes(search) || v.unit.toLowerCase().includes(search))) {
      return true;
    }
    return false;
  });

  // Filter
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getPrice = (product) => product.variants[0]?.price || 0; // Ambil harga varian pertama
    if (sortCriteria === "cheapest") {
      return getPrice(a) - getPrice(b); // Urutkan dari termurah ke termahal
    } else if (sortCriteria === "expensive") {
      return getPrice(b) - getPrice(a); // Urutkan dari termahal ke termurah
    } else if (sortCriteria === "az") {
      return a.productName.localeCompare(b.productName); // Urutkan A-Z berdasarkan productName
    } else if (sortCriteria === "za") {
      return b.productName.localeCompare(a.productName); // Urutkan Z-A berdasarkan productName
    }
    return 0; // Default: Tidak ada pengurutan
  });

 



  // Fungsi untuk menangani perubahan sorting
  const handleSort = (criteria) => {
    console.log('====================================');
    console.log(criteria);
    console.log('====================================');
    setSortCriteria(criteria); // Perbarui kriteria pengurutan
  };

  // Fungsi untuk menangani perubahan kategori
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories); // Perbarui kategori yang dipilih
  };

  // Fungsi untuk mereset semua filter
  const handleResetFilters = () => {
    setSearchTerm(""); // Reset pencarian
    setSelectedCategories([]); // Reset kategori
  };

  return (
    <>
      <Banner />
      <Filter
        toggle={toggle}
        updateToggle={updateToggle}
        onSearch={setSearchTerm}
        onSort={handleSort}
        onCategoryChange={handleCategoryChange}
        onResetFilters={handleResetFilters} // Mengoper fungsi reset ke Filter
        selectedCategories={selectedCategories} // Kategori yang sedang dipilih
      />
      {sortedProducts.length === 0 ? (
        <div className="h-[10lvh] md:h-[30lvh] flex items-center justify-center">
          <p className="md:text-xl text-center mx-5">
            No product found for{" "}
            <span className="font-semibold text text-mainColor dark:text-mainColorD">
              {searchTerm}
            </span>
            . Please try a different search term.
          </p>
        </div>
      ) : (
        <>
          <Card
            toggle={toggle}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
            isSearching={!!searchTerm}
            products={sortedProducts}
          />
        </>
      )}
    </>
  );
}
