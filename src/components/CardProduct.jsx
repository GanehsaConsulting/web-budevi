"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoIosArrowForward } from "react-icons/io";
import { CopyButton } from "./CopyButton";

export const CardProduct = ({ products, searchQuery, toggle }) => {
    const [selectedVariants, setSelectedVariants] = useState(
        products.map((el) => el.variants[0] || null)
    );

    useEffect(() => {
        setSelectedVariants(products.map((el) => el.variants[0] || null));
    }, [products]);

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
        <section className="md:mx-10 mx-5">
            <div className={`grid md:grid-cols-4 md:gap-7 grid-cols-2 gap-5 ${toggle === 2 ? "md:grid-cols-5" : ""} ${toggle === 3 ? "md:grid-cols-6" : ""}`}>
                {products.map((el, idx) => {
                    const selectedVariant = selectedVariants[idx] || { name: "", price: 0 }; // Mencegah undefined error
                    const formattedProductName = el.variants.length === 1
                        ? getUniqueVariantName(el.productName, selectedVariant?.name)
                        : el.productName;

                    return (
                        <div key={idx} className="space-y-2">
                            <div className="relative overflow-hidden">
                                <Image
                                    width={500}
                                    height={500}
                                    src={el.thumbnailURL}
                                    className="rounded-xl md:rounded-2xl w-full h-auto object-cover"
                                    alt={formattedProductName}
                                />
                                <div className="absolute right-1 bottom-1 group">
                                    <CopyButton product={el} variant={selectedVariant} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-wide font-semibold opacity-50"
                                    dangerouslySetInnerHTML={{ __html: highlightText(el.category) }}></p>
                                <div className="text-sm md:text-lg">
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
    );
};
