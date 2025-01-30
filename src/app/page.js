"use client";
import { useState } from "react";
import { Banner } from "@/components/Banner";
import { CardProduct } from "@/components/CardProduct";
import { products } from "../../public/DB";
import { Search } from "@/components/Search";
import { Sort } from "@/components/Sort";
import { Pagination } from "@/components/Pagination";
import { SwitchView } from "@/components/SwitchView";
import { Sticky } from "@/components/Sticky";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("az");
  const [displayedProductsCount, setDisplayedProductsCount] = useState(8); // Inisialisasi jumlah produk yang ditampilkan
  const [toggle, setToggle] = useState(1);

  // Fungsi untuk update toggle
  function updateToggle(id) {
    setToggle(id);
  }

  // Fungsi untuk menangani perubahan urutan
  const handleSort = (command) => {
    setActiveSort(command);
    switch (command) {
      case "az":
        products.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "za":
        products.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "cheapest":
        products.sort((a, b) => {
          const priceA = a.variants[0].price;
          const priceB = b.variants[0].price;
          return priceA - priceB;
        });
        break;
      case "expensive":
        products.sort((a, b) => {
          const priceA = a.variants[0].price;
          const priceB = b.variants[0].price;
          return priceB - priceA;
        });
        break;
      case 0:
      default:
        break;
    }
  };

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();

    return (
      product.productName.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.variants.some(variant => variant.name.toLowerCase().includes(query))
    );
  });

  // Mengambil produk yang ditampilkan berdasarkan jumlah
  const displayedProducts = filteredProducts.slice(0, displayedProductsCount);

  // Fungsi untuk menangani load more
  const handleLoadMore = () => {
    setDisplayedProductsCount(prev => prev + 8); // Menambah jumlah produk yang ditampilkan
  };

  return (
    <>
      <Banner />
      <Sticky className="">
        <Search onSearch={setSearchQuery} />
        <SwitchView toggle={toggle} updateToggle={updateToggle} />
        <Sort onSort={handleSort} activeSort={activeSort} />
      </Sticky>

      {/* Kondisi ketika tidak ada produk yang ditemukan */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-lg font-semibold">
          Tidak ada produk yang ditemukan untuk <span className="font-bold dark:text-sky-300 text-sky-600">{searchQuery}</span>
        </div>
      ) : (
        <CardProduct toggle={toggle} products={displayedProducts} searchQuery={searchQuery} />
      )}

      {/* Menampilkan tombol load more jika ada produk lebih */}
      {filteredProducts.length > displayedProductsCount && (
        <Pagination onLoadMore={handleLoadMore} />
      )}
    </>
  );
}
