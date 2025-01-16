"use client";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { usePathname } from "next/navigation";

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
                        <IoIosSearch className="text-2xl opacity-70" />
                        <input
                            value={searchTerm}
                            onChange={handleSearchChange}
                            type="text"
                            className="grow text-2xl font-medium"
                            placeholder="Search"
                        />
                    </label>
                    <button type="submit" className="hidden">Search</button>
                </form>
            </section>
        </>
    );
};
