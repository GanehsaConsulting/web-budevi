"use client";
import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const ItemsToShow = ({ onChange, currentDisplayed }) => {
    const data = [8, 16, 20, 40, 60, 80, 100, 150, 200, 300];
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
        <div className="dropdown dropdown-bottom">
            {/* Tombol Dropdown */}
            <div
                tabIndex={1}
                role="button"
                className="px-4 py-2 flex gap-1 items-center justify-center border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-900 duration-300 rounded-l-full m-1 bg-mainColorD dark:bg-darkColor text-neutral-800 dark:text-neutral-400 text-sm"
            >
                Data Ditampilkan:
                <span className="font-bold dark:text-white text-black">
                    {selectedItem === currentDisplayed ? selectedItem : currentDisplayed}
                </span>
            </div>

            {/* List Item dalam Dropdown */}
            <ul tabIndex={1} className="dropdown-content menu bg-bgLight dark:bg-darkColor rounded-box z-[1] w-fit flex flex-col justify-center items-center p-2 shadow">
                {data.map((item, idx) => (
                    <li key={idx}>
                        <button
                            onClick={() => handleSelect(item)}
                            className={`grow !text-center ${selectedItem === item ? "font-bold bg-secondaryColor" : ""}`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
