"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoIosArrowForward } from "react-icons/io";
import { CopyButton } from "./CopyButton";
import { FaCheck } from "react-icons/fa";

export const CardProduct = ({ products, searchQuery, toggle, setSelectedItems, selectedItems }) => {
    const [selectedVariants, setSelectedVariants] = useState(
        products.map((el) => el.variants[0] || null)
    );


    useEffect(() => {
        setSelectedVariants(products.map((el) => el.variants[0] || null));
    }, [products]);
    
    const handleSelectItem = (product, variant) => {
        setSelectedItems((prev) => {
            const exists = prev.some(
                (item) => item.productName === product.productName && item.variant.name === variant.name
            );

            if (exists) {
                return prev.filter(
                    (item) => !(item.productName === product.productName && item.variant.name === variant.name)
                );
            } else {
                return [...prev, { ...product, variant }];
            }
        });
    };


    const handleVariantChange = (productIdx, variantIdx) => {
        setSelectedVariants((prev) => {
            const newVariants = [...prev];
            newVariants[productIdx] = products[productIdx]?.variants[variantIdx] || null;
            return newVariants;
        });
    };

    const getUniqueVariantName = (productName, variantName) => {
        if (!variantName) return productName;
        const productWords = productName.split(" ");
        const variantWords = variantName.split(" ");
        const uniqueWords = variantWords.filter(word => !productWords.includes(word));
        return uniqueWords.length > 0 ? `${productName} ${uniqueWords.join(" ")}` : productName;
    };

    const highlightText = (text) => {
        if (!text || !searchQuery) return text;
        const regex = new RegExp(`(${searchQuery})`, "gi");
        return text.replace(regex, `<mark class="bg-secondaryColor bg-opacity-50 dark:text-white rounded-[2px]">$1</mark>`);
    };

    return (
        <>
            <section className="md:mx-10 mx-5">
                <div className={`grid md:gap-7 gap-2 ${toggle === 1 && "grid-cols-2 md:grid-cols-4 "} ${toggle === 2 && "grid-cols-3 md:grid-cols-5"} ${toggle === 3 && "grid-cols-1 lg:grid-cols-6"}`}>
                    {products.map((el, idx) => {
                        const selectedVariant = selectedVariants[idx] || { name: "", price: 0 }; // Mencegah undefined error
                        const formattedProductName = el.variants.length === 1 ? getUniqueVariantName(el.productName, selectedVariant?.name) : el.productName;
                        const isSelected = selectedItems?.some(item => item.productName === el.productName && item.variant.name === selectedVariant.name);

                        return (
                            <div onClick={() => handleSelectItem(el, selectedVariant)} key={idx} className="space-y-2 cursor-pointer flex flex-col group duration-300 md:hover:scale-95 md:hover:brightness-75">
                                <div className="relative overflow-hidden">
                                    <Image
                                        width={500}
                                        height={500}
                                        src={el.thumbnailURL}
                                        className={`${isSelected && "rounded-t-2xl rounded-b-none"} rounded-xl md:rounded-2xl w-full h-auto object-cover bg-secondaryColorD`}
                                        alt={formattedProductName}
                                    />
                                    <div className="absolute right-1 bottom-1 group">
                                        <CopyButton product={el} variant={selectedVariant} />
                                    </div>
                                    {isSelected && <div className="bg-black/30 backdrop-blur rounded-t-2xl absolute inset-0 w-full h-full flex items-center justify-center">
                                        <FaCheck className="text-white/50 text-5xl" />
                                    </div>}
                                </div>
                                <div className={`${isSelected && "p-3 md:p-5 bg-neutral-200/90 dark:bg-darkColor/70 rounded-b-xl md:rounded-b-2xl grow !-mt-5 pt-7 md:pt-9"} ${toggle === 3 && "!text-sm"} space-y-1 duration-200 ease-in-out overflow-hidden`}>
                                    <p className="text-[10px] uppercase tracking-wide font-semibold opacity-50"
                                        dangerouslySetInnerHTML={{ __html: highlightText(el.category) }}></p>
                                    <div className={`${toggle === 3 && "!text-sm"} text-sm md:text-lg`}>
                                        <h1 className="font-medium"
                                            dangerouslySetInnerHTML={{ __html: highlightText(formattedProductName) }}></h1>
                                        <div>
                                            {el.variants.length > 1 && (
                                                <span className="font-semibold text-secondaryColor text-sm flex items-center">
                                                    <IoIosArrowForward />
                                                    <span dangerouslySetInnerHTML={{ __html: highlightText(selectedVariant?.name) }}></span>
                                                </span>
                                            )}
                                            <p className="font-bold">
                                                {formatToRupiah(selectedVariant?.price || 0)}
                                            </p>
                                        </div>
                                    </div>

                                    {el.variants.length > 1 && (
                                        <div>
                                            <select
                                                className="select select-sm w-full border rounded-md bg-mainColorD dark:bg-darkColor"
                                                onChange={(e) => handleVariantChange(idx, e.target.value)}
                                                value={el.variants.indexOf(selectedVariant)}
                                            >
                                                {el.variants.map((vari, vIdx) => (
                                                    <option key={vIdx} value={vIdx}>
                                                        {vari.name} - {formatToRupiah(vari.price)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
