"use client"
import { useState } from "react";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";

export const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Kirim ke parent
    };

    const handleResetSearch = () => {
        setSearchTerm("");
        onSearch(""); // Reset search di parent
    };

    return (
            <label className="bg-mainColorD dark:bg-darkColor input input-sm md:input-md md:h-[40px] h-[40px] rounded-full w-full flex items-center gap-2">
                <IoIosSearch className="opacity-60" />
                <input
                    type="text"
                    className="grow"
                    placeholder="Cari Nama Produk"
                    value={searchTerm}
                    onChange={handleChange}
                />
                {searchTerm && (
                    <button onClick={handleResetSearch} className="active:scale-90 duration-300">
                        <IoIosCloseCircle className="md:text-2xl -mr-1 opacity-40" />
                    </button>
                )}
            </label>
    );
};
