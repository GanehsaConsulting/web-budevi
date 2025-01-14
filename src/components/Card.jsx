"use client"
import Image from "next/image";
import { useState } from "react";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoClose, IoCopyOutline } from "react-icons/io5";

export const Card = ({ products, visibleCount, setVisibleCount }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const dataDisplayed = products.slice(0, visibleCount);

    // Fungsi untuk menyalin data produk ke clipboard
    const formatProductText = (product) => {
        return `
        Nama Produk: ${product.productName}
        Kategori: ${product.category}
        Tipe: ${product.type || "Tidak tersedia"}
        Harga: ${formatToRupiah(product.priceIDR)}
        Stok: ${product.stock}
        URL Gambar: ${product.thumbnailURL}
        `;
    };

    const handleCopyProduct = (product) => {
        const productText = formatProductText(product);
        navigator.clipboard.writeText(productText);
        alert("Produk berhasil disalin!");
    };

    const handleBatchSelect = (product) => {
        setSelectedProducts((prev) =>
            prev.some((p) => p.productName === product.productName)
                ? prev.filter((p) => p.productName !== product.productName)
                : [...prev, product]
        );
    };

    const handleCancelSelect = () => {
        setSelectedProducts([])
    }

    const handleBatchCopy = () => {
        if (selectedProducts.length === 0) {
            alert("Tidak ada produk yang dipilih untuk disalin.");
            return;
        }

        const batchText = selectedProducts.map(formatProductText).join("\n\n");
        navigator.clipboard.writeText(batchText);
        alert("Semua produk terpilih berhasil disalin!");
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    return (
        <>
            <section className="md:mx-10 mx-5 pb-10">
                <div className="grid grid-cols-2 md:grid-cols-5 md:gap-7 gap-3 gap-y-7">
                    {dataDisplayed.map((el, idx) => (
                        <div
                            key={idx}
                            className={`hover:md:p-3 hover:p-[5px] flex flex-col rounded-lg duration-300 ease-in-out md:hover:shadow-mainShadow md:hover:-translate-y-1 space-y-2 
                                ${selectedProducts.some((p) => p.productName === el.productName)
                                    ? "ring-offset-4 ring ring-blue-500 p-3 bg-blue-500 text-white"
                                    : ""
                                }`}
                        >
                            <div className="flex flex-col gap-2 justify-between flex-grow">
                                <Image
                                    className="rounded-lg md:h-[30lvh] object-cover"
                                    width={500}
                                    height={500}
                                    src={el.thumbnailURL}
                                    alt={el.productName}
                                />
                                <div className="flex flex-col space-y-2">
                                    <p className="opacity-50 rounded-md text-[11px] font-semibold uppercase w-fit">
                                        {el.category}
                                    </p>
                                    <h1 className="md:text-lg">{el.productName}</h1>
                                    <p className="md:text-lg font-bold">{formatToRupiah(el.priceIDR)}</p>
                                    <p className="text-sm opacity-70">Stock: {el.stock}</p>
                                </div>
                                <div className="flex flex-col gap-2 w-full mt-auto md:flex-row text-sm md:mt-5">
                                    <button
                                        onClick={() => handleBatchSelect(el)}
                                        className={`px-4 py-1 w-full border border-neutral-200 rounded-full ${selectedProducts.some((p) => p.productName === el.productName)
                                            ? "bg-blue-500 text-white"
                                            : "text-neutral-600"
                                            }`}
                                    >
                                        {selectedProducts.some((p) => p.productName === el.productName)
                                            ? "Dipilih"
                                            : "Pilih"}
                                    </button>
                                    <button
                                        onClick={() => handleCopyProduct(el)}
                                        className="px-4 py-1 w-full justify-center flex gap-2 items-center bg-neutral-100 text-neutral-600 truncate rounded-full"
                                    >
                                        <IoCopyOutline className="md:hidden block" />
                                        Copy Produk
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleCount < products.length && (
                    <div className="py-5 w-full flex justify-center items-center">
                        <button
                            onClick={handleLoadMore}
                            className="active:scale-95 hover:brightness-90 duration-300 px-4 py-2 bg-black text-white rounded-full font-semibold"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>

            {selectedProducts.length > 0 && (
                <div className="fixed bottom-5 right-5 flex md:flex-row flex-col gap-2 md:items-center">
                    <button
                        onClick={handleCancelSelect}
                        className="bg-red-500 rounded-full p-2 text-white text-2xl self-end">
                        <IoClose />
                    </button>
                    <button
                        onClick={handleBatchCopy}
                        className=" px-4 py-2 flex gap-2 items-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:scale-95 duration-300"
                    >
                        <IoCopyOutline />  Copy Produk Terpilih
                    </button>
                </div>
            )}
        </>
    );
};
