"use client";
import Image from "next/image";
import { useState } from "react";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoCopyOutline } from "react-icons/io5";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const CardDetail = ({ products, visibleCount, setVisibleCount }) => {
    // State untuk menyimpan varian yang dipilih berdasarkan produk
    const [selectedVariants, setSelectedVariants] = useState(
        products.reduce((acc, product, idx) => {
            acc[idx] = product.variants[0]; // Default ke varian pertama untuk setiap produk
            return acc;
        }, {})
    );

    // State untuk menyimpan indeks produk yang dipilih untuk batch copy
    const [selectedProducts, setSelectedProducts] = useState([]);

    const dataDisplayed = products.slice(0, visibleCount);

    const handleVariantClick = (productIdx, variant) => {
        setSelectedVariants((prev) => ({
            ...prev,
            [productIdx]: variant,
        }));
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        Toastify({
            text: "Copied to clipboard!",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #4caf50, #2f8f2b)",
                color: "#fff",
            },
        }).showToast();
    };

    const handleBatchCopy = () => {
        const batchText = selectedProducts
            .map((idx) => {
                const variant = selectedVariants[idx];
                return `${variant.name} - ${formatToRupiah(variant.price)} / ${variant.unit}`;
            })
            .join("\n");

        handleCopy(batchText);
    };

    const toggleProductSelection = (idx) => {
        setSelectedProducts((prev) =>
            prev.includes(idx)
                ? prev.filter((productIdx) => productIdx !== idx) // Unselect
                : [...prev, idx] // Select
        );
    };

    return (
        <>
            <section className="md:mx-10 mx-5 pb-10 mt-5">
                <div className="flex justify-end mb-4">
                    {selectedProducts.length > 0 && (
                        <button
                            onClick={handleBatchCopy}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold active:scale-95 hover:brightness-90 duration-300"
                        >
                            Copy Selected Products ({selectedProducts.length})
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-10">
                    {dataDisplayed.map((product, idx) => {
                        const selectedVariant = selectedVariants[idx];

                        return (
                            <div
                                key={idx}
                                className={`rounded-lg flex flex-row gap-5 h-fit w-full`}
                            >
                                <Image
                                    className="rounded-lg h-auto object-cover"
                                    width={500}
                                    height={500}
                                    src={product.thumbnailURL}
                                    alt={product.category}
                                />
                                <div>
                                    <p className="opacity-50 rounded-md text-[11px] font-semibold uppercase w-fit">
                                        {product.category}
                                    </p>
                                    <h1 className="md:text-lg">{selectedVariant.name}</h1>
                                    <p className="md:text-lg font-bold capitalize">
                                        {formatToRupiah(selectedVariant.price)} /{selectedVariant.unit}
                                    </p>

                                    <div className="flex flex-wrap w-full gap-2 mt-5">
                                        {product.variants.map((variant, vIdx) => (
                                            <button
                                                key={vIdx}
                                                onClick={() => handleVariantClick(idx, variant)}
                                                className={`relative grow px-2 py-1 text-sm font-light bg-white dark:bg-black rounded-lg flex gap-2 items-center justify-center border border-neutral-300 dark:border-neutral-700 
                                                    ${variant.name === selectedVariant.name ? "bg-gray-200 !font-medium" : ""
                                                    }`}
                                            >
                                                {variant.name} - {formatToRupiah(variant.price)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
        </>
    );
};
