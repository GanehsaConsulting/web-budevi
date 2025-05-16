"use client";
import { useState, useMemo } from "react";
import { Banner } from "@/components/Banner";
import { CardProduct } from "@/components/CardProduct";
import { Search } from "@/components/Search";
import { Sort } from "@/components/Sort";
import { PaginationNumber } from "@/components/PaginationNumber";
import { SwitchView } from "@/components/SwitchView";
import { Sticky } from "@/components/Sticky";
import { ItemsToShow } from "@/components/ItemsToShow";
import { StackButton } from "@/components/StackButton";
import { PiFlowerLotusLight } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { brandIdentity } from "../../public/System";
import { SkeletonCards } from "@/components/SkeletonCard";
import ProductPDFPreview from "@/components/ProductPDFPreview";
import usePaginatedProducts from "@/hooks/usePaginatedProducts";
import "toastify-js/src/toastify.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("az");
  const [toggle, setToggle] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Panggil data API dengan params page, limit, dan search
  const { data, total, loading, error } = usePaginatedProducts(currentPage, itemsPerPage, searchQuery);

  // data sudah terformat (produk + varian), tinggal sort frontend saja
  // Buat copy supaya sort ga mutate original data
  const sortedProducts = useMemo(() => {
    if (!data) return [];
    const arr = [...data];
    switch (activeSort) {
      case "az":
        arr.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "za":
        arr.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "cheapest":
        arr.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
        break;
      case "expensive":
        arr.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
        break;
      default:
        break;
    }
    return arr;
  }, [data, activeSort]);

  const totalPages = Math.ceil(total / itemsPerPage);

  // Handler sorting
  const handleSort = (command) => {
    setActiveSort(command);
  };

  const handleCancel = () => {
    setSelectedItems([]);
  };

// Ganti handler pencarian agar reset page saat search dijalankan
const handleSearch = (query) => {
  setCurrentPage(1);        // Reset ke halaman pertama
  setSearchQuery(query);    // Trigger fetch
};

  return (
    <>
      <Banner
        head={<>Sinar Lotus <PiFlowerLotusLight /></>}
        desc={brandIdentity.banner.taglineShort}
        imgUrl={"https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=2990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      />
      <Sticky>
        <div className="flex items-center gap-1 md:gap-2 w-full">
          <Search onSearch={handleSearch} />
          <Sort onSort={handleSort} activeSort={activeSort} />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <SwitchView toggle={toggle} updateToggle={setToggle} />
          <ItemsToShow currentDisplayed={itemsPerPage} onChange={setItemsPerPage} totalItems={total} />
        </div>
      </Sticky>

      {loading ? (
        <div className="md:mx-10 mx-5 md:pb-[35px] pb-[10px]">
          <SkeletonCards/>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-10 text-lg font-semibold">
          Tidak ada produk yang ditemukan untuk <span className="font-bold dark:text-sky-300 text-sky-600">{searchQuery}</span>
        </div>
      ) : (
        <CardProduct
          toggle={toggle}
          products={sortedProducts}
          searchQuery={searchQuery}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}

      {totalPages > 1 && (
        <PaginationNumber currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      <StackButton>
        {selectedItems.length > 0 && (
          <>
            <button
              onClick={handleCancel}
              data-tip="Batal Pilih"
              className="tooltip tooltip-right bg-red-500 text-xl hover:scale-95 duration-300 ease-in-out text-white font-bold py-3 px-3 rounded-full shadow-lg flex items-center justify-center"
            >
              <ImCross />
            </button>
            <ProductPDFPreview
              dataTip={"Cetak Produk Terpilih"}
              icon={<FaCheck />}
              className={"!bg-green-500"}
              toggle={toggle}
              products={selectedItems}
            />
          </>
        )}
        <ProductPDFPreview
          dataTip={"Cetak Semua Produk Di Halaman"}
          toggle={toggle}
          products={sortedProducts}
        />
      </StackButton>
    </>
  );
}
