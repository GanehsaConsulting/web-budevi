"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoIosArrowForward } from "react-icons/io";
import { CopyButton } from "./CopyButton";

export const CardProduct = ({ products, searchQuery, toggle }) => {
    const [selectedVariants, setSelectedVariants] = useState(
        products.map((el) => el.variants[0])
    );

    useEffect(() => {
        setSelectedVariants(products.map((el) => el.variants[0]));
    }, [products]);

    const handleVariantChange = (productIdx, variantIdx) => {
        setSelectedVariants((prev) => {
            const newVariants = [...prev];
            newVariants[productIdx] = products[productIdx].variants[variantIdx];
            return newVariants;
        });
    };

    const highlightText = (text) => {
        if (!text || !searchQuery) return text;
        const regex = new RegExp(`(${searchQuery})`, "gi");
        return text.replace(regex, `<mark class="bg-yellow-300 bg-opacity-0 border-b dark:text-white">$1</mark>`);
    };

    return (
        <section className="md:mx-10 mx-5">
            <div className={`grid md:grid-cols-4 md:gap-7 grid-cols-2 gap-5 ${toggle === 2 ? "md:grid-cols-5" : ""} ${toggle === 3 ? "md:grid-cols-6" : ""}`}>
                {products.map((el, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="relative overflow-hidden">
                            <Image
                                width={500}
                                height={500}
                                src={el.thumbnailURL}
                                className="rounded-xl md:rounded-2xl w-full h-auto object-cover"
                                alt={el.productName}
                            />
                            <div className="absolute right-1 bottom-1 group">
                                {/* Kirim selectedVariants[idx] langsung ke CopyButton */}
                                <CopyButton product={el} variant={selectedVariants[idx]} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-wide font-semibold opacity-50"
                                dangerouslySetInnerHTML={{ __html: highlightText(el.category) }}></p>
                            <div className="text-sm md:text-lg">
                                <h1 className="font-medium"
                                    dangerouslySetInnerHTML={{ __html: highlightText(el.productName) }}></h1>
                                <div>
                                    <span className={` font-semibold text-secondaryColor text-sm flex items-center`}>
                                        <IoIosArrowForward />
                                        <span dangerouslySetInnerHTML={{ __html: highlightText(selectedVariants[idx]?.name) }}></span>
                                    </span>
                                    <p className="font-bold">
                                        {formatToRupiah(selectedVariants[idx]?.price)}
                                    </p>
                                </div>
                            </div>

                            {el.variants.length > 1 && (
                                <div>
                                    <select
                                        className="select select-sm w-full border rounded-md bg-mainColorD dark:bg-darkColor"
                                        onChange={(e) => handleVariantChange(idx, e.target.value)}
                                        value={el.variants.indexOf(selectedVariants[idx])}
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
                ))}
            </div>
        </section>
    );
};
