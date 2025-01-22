"use client";

import Image from "next/image";
import { useState } from "react";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoClose, IoCopyOutline } from "react-icons/io5";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { RiArrowDownWideFill } from "react-icons/ri";
import { ExpandableButton } from "./ExpandableButton";

export const Card = ({ products, visibleCount, setVisibleCount, toggle }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [variant, setVariant] = useState(
        products.reduce((acc, product, idx) => {
            acc[idx] = product.variants[0]; // Default ke varian pertama untuk setiap produk
            return acc;
        }, {})
    );

    const handleVariantClick = (productIdx, selectedVariant) => {
        setVariant((prev) => ({
            ...prev,
            [productIdx]: selectedVariant,
        }));
    };

    const dataDisplayed = products.slice(0, visibleCount);

    const formatProductText = (product, selectedVariant) => {
        const variantsText = product.variants.length > 1 ?
            `Varian Terpilih: ${selectedVariant.name} 
        Harga: ${formatToRupiah(selectedVariant.price)} 
        Unit: ${selectedVariant.unit}`
            :
            product.variants.map(variant =>
                `Harga: ${formatToRupiah(variant.price)} 
        Unit: ${variant.unit}`)
                .join(' | ');  // Ganti "\n" dengan pemisah ' | '

        return `
        Nama Produk: ${product.category} ${selectedVariant.name}
        Kategori: ${product.category}
        URL Gambar: ${product.thumbnailURL}
        ${variantsText}
        `;
    };



    const handleCopyProduct = (product, productIdx) => {
        const selectedVariant = variant[productIdx] || product.variants[0]; // Ambil varian yang dipilih
        const productText = formatProductText(product, selectedVariant);

        navigator.clipboard.writeText(productText);
        Toastify({
            text: "Produk berhasil disalin!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
        }).showToast();
    };

    const handleBatchSelect = (product) => {
        setSelectedProducts((prev) => {
            const isSelected = prev.some(
                (p) => p.category === product.category && p.variants[0].name === product.variants[0].name
            );

            let newSelectedProducts;
            if (isSelected) {
                newSelectedProducts = prev.filter(
                    (p) => !(p.category === product.category && p.variants[0].name === product.variants[0].name)
                );
            } else {
                newSelectedProducts = [...prev, product];
            }
            return newSelectedProducts;
        });
    };

    const handleCancelSelect = () => {
        setSelectedProducts([]);
    };

    const handleBatchCopy = () => {
        if (selectedProducts.length === 0) {
            alert("Tidak ada produk yang dipilih untuk disalin.");
            return;
        }

        const batchText = selectedProducts.map((product, idx) => {
            const selectedVariant = variant[idx];
            return formatProductText(product, selectedVariant);
        }).join("\n\n");

        navigator.clipboard.writeText(batchText);
        Toastify({
            text: "Semua produk terpilih berhasil disalin!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
        }).showToast();
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    return (
        <>
            <section className="md:mx-10 mx-5 pb-10 mt-5">
                {toggle === 2 &&
                    (
                        <>
                            <div className={`md:hidden grid grid-cols-1 md:gap-7 gap-3 gap-y-7 duration-300 ease-in-out`}>
                                {dataDisplayed.map((product, idx) => {
                                    const selectedVariant = variant[idx];
                                    return (
                                        <div
                                            key={idx}
                                            className={`group flex flex-col rounded-lg duration-300 ease-in-out md:hover:-translate-y-1 space-y-2 ${selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name)
                                                ? "ring-offset-4 dark:ring-offset-black ring ring-darkColor dark:ring-bgLight dark:ring-opacity-20 ring-opacity-20 md:p-3 p-2 !rounded-2xl overflow-hidden mx-[3px] md:mx-0"
                                                : ""
                                                }`}
                                        >
                                            <div className="flex flex-row gap-2 flex-grow relative">
                                                <Image
                                                    className="min-w-[30lvw] min-h-[30lvw] max-w-[30lvw] max-h-[30lvw] rounded-lg opacity-100 md:h-[30lvh] z-20 object-cover"
                                                    width={500}
                                                    height={500}
                                                    src={product.thumbnailURL}
                                                    alt={product.category}
                                                />
                                                <div className="z-20 space-y-2">
                                                    <p className="opacity-50 rounded-md text-[11px] font-semibold uppercase w-fit">
                                                        {product.category}
                                                    </p>
                                                    <div className="flex flex-col space-y-1">
                                                        <h1 className="md:text-lg">
                                                            {product.category} {' '}
                                                            <span className="font-medium">
                                                                {selectedVariant.name}
                                                            </span>
                                                        </h1>
                                                        <div className="flex gap-1 items-center">
                                                            <span className="md:text-lg font-bold">
                                                                {formatToRupiah(selectedVariant.price)}
                                                            </span>
                                                            <span className="text-sm opacity-50">
                                                                ({selectedVariant.unit})
                                                            </span>
                                                        </div>
                                                        {product.variants.length > 1 && (
                                                            <ExpandableButton
                                                                arrowType={<RiArrowDownWideFill />}
                                                                contentH={'25px'}
                                                                className={'w-full bg-bgLight dark:bg-darkColor rounded-lg px-4 text-xl'}
                                                                align={'items-center justify-center w-full'}
                                                                classNameInner={'flex flex-wrap gap-2'}
                                                            >
                                                                {product.variants?.map((v, variantIdx) => (
                                                                    <button
                                                                        key={variantIdx}
                                                                        onClick={() => handleVariantClick(idx, v)}
                                                                        className={`ˇ
                                                                ${variant[idx]?.name === v.name ? "bg-mainColor text-white" : ""}
                                                                px-1 text-sm bg-bgLight dark:bg-darkColor text-neutral-500 rounded-md uppercase font-medium grow flex items-center justify-center `}
                                                                    >
                                                                        {v.name}
                                                                    </button>
                                                                ))}
                                                            </ExpandableButton>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2 w-full mt-auto flex-row text-sm md:mt-5 z-20">
                                                        <button
                                                            onClick={() => handleBatchSelect(product)}
                                                            className={`hover:bg-blue-500 hover:text-white text-darkColor group-hover:border-neutral-500 duration-300 active:scale-90 px-4 py-1 w-fit border border-neutral-200 dark:border-neutral-500 dark:text-bgLight rounded-full ${selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name)
                                                                ? "dark:bg-darkColor bg-bgLight text-black dark:text-white dark:!border-neutral-800 border-neutral-200 font-medium"
                                                                : "text-neutral-600"
                                                                }`}
                                                        >
                                                            {selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name)
                                                                ? "Dipilih"
                                                                : "Pilih"}
                                                        </button>

                                                        <button
                                                            onClick={() => handleCopyProduct(product, idx)}
                                                            className="hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 active:scale-90 px-4 py-1 w-fit justify-center flex gap-2 items-center bg-bgLight dark:text-white dark:bg-darkColor text-neutral-600 truncate rounded-full"
                                                        >
                                                            <IoCopyOutline /> Copy Produk
                                                        </button>
                                                    </div>
                                                </div>

                                                {selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name) && (
                                                    <div className="absolute w-full h-full bg-white dark:bg-black opacity-10 duration-200 scale-125 inset-0 z-[15]"></div>
                                                )}

                                                {/* <Image
                                                    className={`absolute w-full duration-100 scale-90 dark:scale-[.8] translate-y-10 rounded-lg md:h-[30lvh] z-10 object-cover blur-xl dark:blur-2xl dark:brightness-125 dark:opacity-40 opacity-30 ${selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name) &&
                                                        "!w-full !h-full !scale-150 !opacity-50"
                                                        }`}
                                                    width={1}
                                                    height={1}
                                                    src={product.thumbnailURL}
                                                    alt={product.category}
                                                /> */}

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                <>
                    <div className={`grid grid-cols-2 md:grid-cols-4 md:gap-7 gap-3 gap-y-7 duration-300 ease-in-out
                                            ${toggle === 2 && "!grid-cols-2"}
                    `}>
                        {dataDisplayed.map((product, idx) => {
                            const selectedVariant = variant[idx];
                            return (
                                <div
                                    key={idx}
                                    className={`group flex flex-col rounded-lg duration-300 ease-in-out md:hover:-translate-y-1 space-y-2 ${selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name)
                                        ? "ring-offset-4 dark:ring-offset-black ring ring-darkColor dark:ring-bgLight dark:ring-opacity-20 ring-opacity-20 md:p-3 p-2 !rounded-2xl overflow-hidden mx-[3px] md:mx-0"
                                        : ""
                                        }`}
                                >
                                    <div className="flex flex-col gap-2 justify-between flex-grow relative">
                                        <div className="z-20 space-y-2">
                                            <Image
                                                className="w-full h-auto rounded-lg opacity-100 md:h-[30lvh] z-20 object-cover"
                                                width={500}
                                                height={500}
                                                src={product.thumbnailURL}
                                                alt={product.category}
                                            />
                                            <p className="opacity-50 rounded-md text-[11px] font-semibold uppercase w-fit">
                                                {product.category}
                                            </p>
                                            <div className="flex flex-col space-y-1">
                                                <h1 className="md:text-lg">
                                                    {product.category} {' '}
                                                    <span className="font-medium">
                                                        {selectedVariant.name}
                                                    </span>
                                                </h1>
                                                <div className="flex gap-1 items-center">
                                                    <span className="md:text-lg font-bold">
                                                        {formatToRupiah(selectedVariant.price)}
                                                    </span>
                                                    <span className="text-sm opacity-50">
                                                        ({selectedVariant.unit})
                                                    </span>
                                                </div>
                                                {product.variants.length > 1 && (
                                                    <>
                                                        <ExpandableButton
                                                            arrowType={<RiArrowDownWideFill />}
                                                            contentH={'25px'}
                                                            className={'w-full flex justify-center bg-bgLight dark:bg-darkColor rounded-lg px-4 text-xl'}
                                                            align={'items-center justify-center'}
                                                            classNameInner={'flex flex-wrap gap-2'}
                                                        >
                                                            {product.variants?.map((v, variantIdx) => (
                                                                <button
                                                                    key={variantIdx}
                                                                    onClick={() => handleVariantClick(idx, v)}
                                                                    className={`
                                                                        ${variant[idx]?.name === v.name ? "bg-mainColor text-white" : ""}
                                                                        px-1 text-sm bg-bgLight dark:bg-darkColor text-neutral-500 rounded-md uppercase font-medium grow flex items-center justify-center `}
                                                                >
                                                                    {v.name}
                                                                </button>
                                                            ))}
                                                        </ExpandableButton>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name) && (
                                            <div className="absolute w-full h-full bg-white dark:bg-black opacity-10 duration-200 scale-125 inset-0 z-[15]"></div>
                                        )}

                                        <Image
                                            className={`absolute w-full duration-100 scale-90 dark:scale-[.8] translate-y-10 rounded-lg md:h-[30lvh] z-10 object-cover blur-xl dark:blur-2xl dark:brightness-125 dark:opacity-40 opacity-30 ${selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name) &&
                                                "!w-full !h-full !scale-150 !opacity-50"
                                                }`}
                                            width={1}
                                            height={1}
                                            src={product.thumbnailURL}
                                            alt={product.category}
                                        />
                                        <div className="flex flex-col gap-2 w-full mt-auto md:flex-row text-sm md:mt-5 z-20">
                                            <button
                                                onClick={() => handleBatchSelect(product)}
                                                className={`hover:bg-blue-500 hover:text-white text-darkColor group-hover:border-neutral-500 duration-300 active:scale-90 px-4 py-1 w-full border border-neutral-200 dark:border-neutral-500 dark:text-bgLight rounded-full ${selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name)
                                                    ? "dark:bg-darkColor bg-bgLight text-black dark:text-white dark:!border-neutral-800 border-neutral-200 font-medium"
                                                    : "text-neutral-600"
                                                    }`}
                                            >
                                                {selectedProducts.some((p) => p.category === product.category && p.variants[0].name === product.variants[0].name)
                                                    ? "Dipilih"
                                                    : "Pilih"}
                                            </button>

                                            <button
                                                onClick={() => handleCopyProduct(product, idx)}
                                                className="hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 active:scale-90 px-4 py-1 w-full justify-center flex gap-2 items-center bg-bgLight dark:text-white dark:bg-darkColor text-neutral-600 truncate rounded-full"
                                            >
                                                <IoCopyOutline /> Copy Produk
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>

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
                <div className="fixed bottom-5 right-5 flex md:flex-row flex-col gap-2 md:items-center z-40">
                    <button
                        onClick={handleCancelSelect}
                        className="bg-red-500 rounded-full p-1 text-white text-2xl self-end md:block hidden"
                    >
                        <IoClose />
                    </button>
                    <button
                        onClick={handleCancelSelect}
                        className="px-3 py-1 w-fit self-end md:hidden flex gap-1 items-center bg-red-500 font-medium text-white rounded-full shadow-lg hover:bg-red-600 active:scale-95 duration-300"
                    >
                        <IoClose className="text-lg" /> Cancel
                    </button>
                    <button
                        onClick={handleBatchCopy}
                        className="px-3 py-1 flex gap-2 items-center font-medium bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:scale-95 duration-300"
                    >
                        <IoCopyOutline /> Copy Produk Terpilih
                    </button>
                </div>
            )}
        </>
    );
};
