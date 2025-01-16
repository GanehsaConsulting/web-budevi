"use client";
import { Card } from "@/components/Card";
import { usePathname, useRouter } from "next/navigation";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { products } from "../../../../public/DB";
import { IoSearch } from "react-icons/io5";

export default function SearchPage() {
    const pathname = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState(pathname.split("/").pop() || ""); // Input query
    const [searchQuery, setSearchQuery] = useState(query); // Query for search results
    const [visibleCount, setVisibleCount] = useState(6);

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
        product.productName.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
        setSearchQuery(query); // Update searchQuery only when button is clicked
    };

    const handleResetSearch = () => {
        setQuery(""); // Reset query input, but not searchQuery
    };

    return (
        <div className="py-24 min-h-screen">
            <form onSubmit={handleSearch} className="flex mb-5 md:mb-10 md:mx-10 mx-5">
                <label className="bg-bgLight dark:bg-darkColor input input-sm md:input-md rounded-full w-full flex items-center gap-2">
                    <IoSearch />
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
                                ? "block md:text-2xl -mr-1 opacity-40"
                                : "hidden"
                                }`}
                        />
                    </button>
                </label>
                <button
                    type="submit"
                    className="ml-2 bg-bgLight border-none dark:bg-darkColor font-medium btn md:btn-md btn-sm text-black dark:text-white rounded-full px-4 py-2"
                >
                    Search
                </button>
            </form>
            <dov>
                {filteredProducts.length > 0 ? (
                    <Card
                        visibleCount={visibleCount}
                        setVisibleCount={setVisibleCount}
                        products={filteredProducts}
                    />
                ) : (
                    <div className="mt-10 text-center text-gray-500 dark:text-gray-400">
                        <p>No products found for "{searchQuery}".</p>
                    </div>
                )}
            </dov>
        </div>
    );
}
