"use client";
import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const ItemsToShow = ({ onChange, currentDisplayed, totalItems }) => {
    const data = [20, 40, 60, 80, 100];
    const [selectedItem, setSelectedItem] = useState(data[0]); // Default nilai pertama

    const handleSelect = (item) => {
        setSelectedItem(item);
        onChange(item);

        // Menampilkan notifikasi
        Toastify({
            text: `Menampilkan ${item} produk`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#fea800",
            stopOnFocus: true,
        }).showToast();
    };

    return (
        <>
            <div className="dropdown dropdown-bottom">
                {/* Tombol Dropdown */}
                <div
                    tabIndex={1}
                    role="button"
                    className="px-4 py-[10px] w-full truncate flex gap-1 items-center justify-center border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-900 duration-300 rounded-full m-1 bg-mainColorD dark:bg-darkColor text-neutral-800 dark:text-neutral-400 text-sm"
                >
                    <span className="md:block hidden">
                        Produk Ditampilkan:
                    </span>
                    <span className="text-xs block md:hidden" >
                        Produk:
                    </span>
                    <span className="font-bold dark:text-white text-black">
                        {selectedItem === currentDisplayed ? selectedItem : currentDisplayed}
                    </span>
                </div>

                {/* List Item dalam Dropdown */}
                <ul tabIndex={1} className="dropdown-content menu bg-bgLight dark:bg-darkColor rounded-box z-[1] w-fit flex flex-col justify-center items-center p-2 shadow">
                    {data.map((item, idx) => (
                        <li key={idx} className="flex w-full">
                            <button
                                onClick={() => handleSelect(item)}
                                className={`flex items-center justify-center ${currentDisplayed === item ? "font-bold bg-secondaryColor" : ""}`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                    <li>
                        <div
                            // onClick={() => handleSelect(totalItems)}
                            className="btn !btn-ghost btn-xs btn-disabled"
                        >
                            <div className="opacity-50 text-xs">
                                Total Produk ({totalItems})
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};
