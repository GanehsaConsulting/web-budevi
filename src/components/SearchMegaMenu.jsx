"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export const SearchMegaMenu = ({ isExpanded }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            const newPath = `/search/${encodeURIComponent(searchTerm.trim())}`;
            window.location.href = newPath;
        }
    };

    const handleResetSearch = () => {
        setSearchTerm(""); // Reset search term
    };

    return (
        <>
            <section>
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <label className="input dark:bg-black w-full bg-white z-[60] input-md md:input-lg rounded-none !px-0 dark:focus-within:border-opacity-40 focus-within:border-opacity-40 bg-opacity-0 focus:border-none focus:bg-none focus-within:outline-none outline-none border-0 focus:outline-transparent focus:outline-offset-0 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <IoSearch className="text-2xl md:text-2xl md:opacity-70 order-last md:order-none hidden md:block" />
                        <input
                            value={searchTerm}
                            onChange={handleSearchChange}
                            type="text"
                            className="grow text-2xl md:text-2xl font-medium placeholder:text-darkColor dark:placeholder:text-bgLight"
                            placeholder="Search"
                        />
                    </label>
                    <button type="submit" className="md:hidden flex items-center">
                        <IoSearch
                            className={`text-2xl md:text-2xl md:opacity-70 order-last md:order-none transition-all duration-300 ease-in-out transform ${searchTerm ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
                        />
                        <span className={`bg-bgLight border-none dark:bg-darkColor font-medium btn md:btn-md btn-sm text-black dark:text-white rounded-full px-4 py-2 transition-all duration-300 ease-in-out transform ${searchTerm ? "opacity-100 translate-x-5" : "opacity-0 translate-x-5"}`}>
                            Cari
                        </span>
                    </button>


                </form>
            </section>
        </>
    );
};
