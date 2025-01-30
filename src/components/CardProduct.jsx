"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoIosArrowForward } from "react-icons/io";

export const CardProduct = ({ products, searchQuery, toggle }) => {
    const [selectedVariants, setSelectedVariants] = useState(
        products.map((el) => el.variants[0])
    );

    // Update selectedVariants setelah produk disortir
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

// 🔥 Fungsi untuk menambahkan highlight pada teks yang cocok
const highlightText = (text) => {
    if (!text || !searchQuery) return text; // Pastikan text dan searchQuery ada
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-300 bg-opacity-0 dark:text-white animate-pulse rounded-[4px]">$1</mark>`);
};


    return (
        <>
            <section className="md:mx-10 mx-5">
                <div className={`${toggle === 2 && "md:grid-cols-3"} gridc ${toggle === 3 && "md:grid-cols-6"} grid md:grid-cols-4 md:gap-7 grid-cols-2 gap-5 gap-y-14`}>
                    {products.map((el, idx) => (
                        <div key={idx} className="space-y-2">
                            <Image
                                width={500}
                                height={500}
                                src={el.thumbnailURL}
                                className="rounded-lg w-full h-auto object-cover"
                                alt={el.productName}
                            />
                            <div className="space-y-1">
                                {/* Highlight Category */}
                                <p
                                    className="text-xs uppercase tracking-wide font-semibold opacity-50"
                                    dangerouslySetInnerHTML={{ __html: highlightText(el.category) }}
                                ></p>

                                <div>
                                    {/* Highlight Product Name */}
                                    <h1
                                        className="font-medium"
                                        dangerouslySetInnerHTML={{ __html: highlightText(el.productName) }}
                                    ></h1>

                                    <div className="">
                                        <span className={`${el.variants.length <= 2 && "!hidden"} font-semibold text-sky-600 dark:text-sky-300 text-sm flex items-center`}>
                                            <IoIosArrowForward />
                                            <span
                                                dangerouslySetInnerHTML={{ __html: highlightText(selectedVariants[idx]?.name) }}
                                            ></span>
                                        </span>
                                        <p className="font-bold">
                                            {formatToRupiah(selectedVariants[idx]?.price)}
                                        </p>
                                    </div>
                                </div>

                                {el.variants.length > 1 && (
                                    <div>
                                        <select
                                            className="select select-sm w-full border rounded-md bg-bgLight dark:bg-darkColor"
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
        </>
    );
};
