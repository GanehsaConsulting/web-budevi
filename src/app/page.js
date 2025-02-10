"use client";
import { useEffect, useState } from "react";
import { Banner } from "@/components/Banner";
import { CardProduct } from "@/components/CardProduct";
import { products } from "../../public/DB";
import { Search } from "@/components/Search";
import { Sort } from "@/components/Sort";
import { Pagination } from "@/components/Pagination";
import { SwitchView } from "@/components/SwitchView";
import { Sticky } from "@/components/Sticky";
import { PiFlowerLotusLight } from "react-icons/pi";
import { brandIdentity } from "../../public/System";
import ProductPDFPreview from "@/components/ProductPDFPreview";
import { ItemsToShow } from "@/components/ItemsToShow";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { StackButton } from "@/components/StackButton";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("az");
  const [displayedProductsCount, setDisplayedProductsCount] = useState(16);
  const [prevProductsCount, setPrevProductsCount] = useState(16);  // Inisialisasi jumlah produk yang ditampilkan
  const [toggle, setToggle] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);


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
    setDisplayedProductsCount(prev => prev + 8);
  };

  // Fungsi untuk mengosongkan batch select untuk cetak PDF
  const handleCancel = () => {
    setSelectedItems([])
  }

  // Gunakan useEffect untuk menampilkan notifikasi hanya sekali setelah update state
  useEffect(() => {
    if (displayedProductsCount > prevProductsCount) {
      const newProductsCount = displayedProductsCount - prevProductsCount;

      Toastify({
        text: `+${newProductsCount} produk ditambahkan! Total: ${displayedProductsCount} produk`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#fea800",
        stopOnFocus: true,
      }).showToast();

      setPrevProductsCount(displayedProductsCount); // Update jumlah sebelumnya
    }
  }, [displayedProductsCount, prevProductsCount]);


  return (
    <>
      <Banner
        head={<>Sinar Lotus<PiFlowerLotusLight /></>}
        desc={brandIdentity.banner.taglineShort}
        imgUrl={'https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=2990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      />
      <Sticky>
        <div className="flex items-center gap-2 w-full">
          <Search onSearch={setSearchQuery} />
          <Sort onSort={handleSort} activeSort={activeSort} />
        </div>
        <div className="flex items-center gap-2 w-full">
          <SwitchView toggle={toggle} updateToggle={updateToggle} />

          <div className="-space-x-[4.5px] grow">
            <ItemsToShow currentDisplayed={displayedProductsCount} onChange={setDisplayedProductsCount} />
            {filteredProducts.length > displayedProductsCount && (
              <Pagination onLoadMore={handleLoadMore} />
            )}
          </div>
        </div>
      </Sticky>

      {/* Kondisi ketika tidak ada produk yang ditemukan */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-lg font-semibold">
          Tidak ada produk yang ditemukan untuk <span className="font-bold dark:text-sky-300 text-sky-600">{searchQuery}</span>
        </div>
      ) : (
        <CardProduct toggle={toggle} products={displayedProducts} searchQuery={searchQuery} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      )}
      <StackButton >
        {selectedItems.length > 0 && (
          <>
            <button onClick={handleCancel} data-tip="Batal Pilih" className="tooltip tooltip-right bg-red-500 text-xl hover:scale-95 duration-300 ease-in-out text-white font-bold py-3 px-3 rounded-full shadow-lg flex items-center justify-center">
              <ImCross />
            </button>
            <ProductPDFPreview dataTip={"Cetak Produk Terpilih"} icon={<FaCheck />} className={"!bg-green-500"} toggle={toggle} products={selectedItems} />
          </>
        )}
        <ProductPDFPreview dataTip={"Cetak Semua Produk Di Halaman"} toggle={toggle} products={displayedProducts} />
      </StackButton>
    </>
  );
}
