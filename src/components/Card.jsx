"use client"
import Image from "next/image";
import { useState } from "react";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoClose, IoCopyOutline } from "react-icons/io5";
import Toastify from 'toastify-js'; // Import Toastify
import 'toastify-js/src/toastify.css'; // Import Toastify CSS

export const Card = ({ products, visibleCount, setVisibleCount }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const dataDisplayed = products.slice(0, visibleCount);

    // Fungsi untuk menyalin data produk ke clipboard
    const formatProductText = (product) => {
        return `
        Nama Produk: ${product.productName}
        Kategori: ${product.category}
        Tipe: ${product.type || "Tidak tersedia"}
        Ukuran: ${product.sizes || "Tidak tersedia"}
        Harga: ${formatToRupiah(product.priceIDR)}
        Stok: ${product.stock}
        URL Gambar: ${product.thumbnailURL}
        `;
    };

    const handleCopyProduct = (product) => {
        const productText = formatProductText(product);
        navigator.clipboard.writeText(productText);
        Toastify({
            text: "Produk berhasil disalin!",
            duration: 3000,
            gravity: "top", // can be "top" or "bottom"
            position: 'right', // can be "left", "center" or "right"
            backgroundColor: "#4caf50", // Success color
            stopOnFocus: true, // Prevents dismissing of toast on hover
        }).showToast();
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
        Toastify({
            text: "Semua produk terpilih berhasil disalin!",
            duration: 3000,
            gravity: "top", // can be "top" or "bottom"
            position: 'right', // can be "left", "center" or "right"
            backgroundColor: "#4caf50", // Success color
            stopOnFocus: true, // Prevents dismissing of toast on hover
        }).showToast();
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    return (
        <>
            <section className="md:mx-10 mx-5 pb-10 mt-5">
                <div className="grid grid-cols-2 md:grid-cols-5 md:gap-7 gap-3 gap-y-7">
                    {dataDisplayed.map((el, idx) => (
                        <div
                            key={idx}
                            className={`md:hover:p-3 flex flex-col rounded-2xl duration-300 ease-in-out md:hover:shadow-mainShadow md:dark:hover:shadow-[0px_0px_30px_#b8b8b86e] md:hover:-translate-y-1 space-y-2 
                                ${selectedProducts.some((p) => p.productName === el.productName)
                                    ? "ring-offset-4 dark:ring-offset-black ring ring-mainColor p-3 bg-mainColor dark:ring-mainColorD dark:bg-mainColorD text-white"
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
                                    <div className="text-sm opacity-70 flex gap-2 flex-wrap">
                                        <p>Stock : {el.stock}</p>
                                        {el.sizes ? (
                                            <div className="flex flex-wrap items-center gap-1">
                                                <p>Size:</p>
                                                {el.sizes.map((size, idx) => (
                                                    <p
                                                        key={idx}
                                                        className={`px-[4px] py-[1px] flex items-center justify-center font-medium bg-secondaryBase dark:bg-secondaryColorD dark:text-black rounded-md
                                                             ${selectedProducts.some((p) => p.productName === el.productName)
                                                                ? "bg-white !text-neutral-800"
                                                                : ""
                                                            }
                                                            `}
                                                    >
                                                        {size}
                                                    </p>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full mt-auto md:flex-row text-sm md:mt-5">
                                    <button
                                        onClick={() => handleBatchSelect(el)}
                                        className={`hover:bg-blue-500 hover:text-white duration-300 active:scale-90 px-4 py-1 w-full border border-neutral-200 dark:border-neutral-500 dark:text-bgLight rounded-full ${selectedProducts.some((p) => p.productName === el.productName)
                                            ? "dark:bg-darkColor bg-bgLight text-black dark:text-white dark:!border-neutral-800 border-neutral-200 font-medium"
                                            : "text-neutral-600"
                                            }`}
                                    >
                                        {selectedProducts.some((p) => p.productName === el.productName)
                                            ? "Dipilih"
                                            : "Pilih"}
                                    </button>
                                    <div className="md:block hidden">
                                        {selectedProducts.some((p) => p.productName === el.productName) ?
                                            (
                                                <button
                                                    onClick={() => handleCopyProduct(el)}
                                                    className="hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 active:scale-90 btn btn-circle btn-sm justify-center flex gap-2 items-center bg-bgLight dark:text-white dark:bg-darkColor text-neutral-600 truncate rounded-full"
                                                >
                                                    <IoCopyOutline className="block" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleCopyProduct(el)}
                                                    className="hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 active:scale-90 px-4 py-1 w-full justify-center flex gap-2 items-center bg-bgLight dark:text-white dark:bg-darkColor text-neutral-600 truncate rounded-full"
                                                >
                                                    <IoCopyOutline className="md:hidden block" />
                                                    Copy Produk
                                                </button>

                                            )
                                        }
                                    </div>
                                    <div className="block md:hidden">

                                        <button
                                            onClick={() => handleCopyProduct(el)}
                                            className="hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 active:scale-90 px-4 py-1 w-full justify-center flex gap-2 items-center bg-bgLight dark:text-white dark:bg-darkColor text-neutral-600 truncate rounded-full"
                                        >
                                            <IoCopyOutline className="md:hidden block" />
                                            Copy Produk
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleCount < products.length && (
                    <div className="py-5 w-full flex justify-center items-center">
                        <button
                            onClick={handleLoadMore}
                            className="active:scale-95 hover:brightness-90 duration-300 px-4 py-2 dark:invert bg-black text-white rounded-full font-semibold"
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
