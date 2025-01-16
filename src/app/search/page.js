"use client";
import { Card } from "@/components/Card";
import { usePathname, useRouter } from "next/navigation";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { products } from "../../../public/DB";

export default function SearchPage() {
    const pathname = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState(pathname.split("/").pop() || "");
    const [searchQuery, setSearchQuery] = useState(query); // State for the search query

    useEffect(() => {
        // Update the pathname when searchQuery changes
        if (searchQuery) {
            router.push(`/search/${searchQuery}`);
        } else {
            router.push('/search'); // Reset to search page if searchQuery is empty
        }
    }, [searchQuery, router]);

    // Filter products based on searchQuery
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
        setSearchQuery(query); // Update searchQuery only when button is clicked
    };

    const handleResetSearch = () => {
        setSearchQuery(""); // Reset searchQuery
    };

    return (
        <div className="h-screen py-24 md:mx-10 mx-5">
            <form onSubmit={handleSearch} className="flex">
                <label className="bg-bgLight dark:bg-darkColor input input-sm md:input-md rounded-full w-full flex items-center gap-2">
                    <IoIosSearch />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // Update query while typing
                        type="text"
                        className="grow"
                        placeholder="Search"
                    />
                    <button
                        type="button"
                        onClick={handleResetSearch}
                        className="active:scale-90 duration-300"
                    >
                        <IoIosCloseCircle
                            className={`${query !== ""
                                ? "block  md:text-2xl -mr-1 opacity-40"
                                : "hidden"
                                }`}
                        />
                    </button>
                </label>
                <button
                    type="submit"
                    className="ml-2 bg-darkColor font-medium btn md:btn-md btn-sm text-white rounded-full px-4 py-2"
                >
                    Search
                </button>
            </form>
            {filteredProducts.length > 0 ? (
                <Card products={filteredProducts} />
            ) : (
                <div className="mt-10 text-center text-gray-500 dark:text-gray-400">
                    <p>No products found for "{searchQuery}".</p>
                </div>
            )}
        </div>
    );
}
