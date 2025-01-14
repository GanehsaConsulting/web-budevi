"use client";
import { useEffect, useState } from "react";
import { products } from "../../public/DB";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";

export const Filter = ({ onSearch, onSort, onCategoryChange, onResetFilters }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All"); // Start with "All" as default selected category

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);

    const data = products;

    // Extract unique categories
    const uniqueCategories = [];
    data.forEach((el) => {
        if (!uniqueCategories.includes(el.category)) {
            uniqueCategories.push(el.category);
        }
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [sortCriteria, setSortCriteria] = useState("cheapest"); // Default sort: cheapest

    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Update search term in parent component
    };

    // Reset search
    const handleResetSearch = () => {
        setSearchTerm("");
        onSearch(""); // Reset search in parent component
    };

    // Handle sorting
    const handleSortChange = (criteria) => {
        setSortCriteria(criteria); // Update local sort criteria
        onSort(criteria); // Pass sort criteria to parent component
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onCategoryChange(category); // Pass category selection to parent component
    };

    // Reset filters (reset category filter to "All")
    const handleResetFilters = () => {
        setSelectedCategory("All");
        onCategoryChange("All"); // Reset category in parent component
    };

    return (
        <>
            <section className={`
                ${visible && isScrolled ? "translate-y-[52px] top-0" : "-translate-y-[50%] md:top-[54px] top-[45px]"}
                ${!isScrolled && "-translate-y-0"}
                duration-300 sticky z-[888] bg-white bg-opacity-80 backdrop-blur-xl py-2 mt-10 md:mt-0`}>
                <div className="md:mx-10 mx-5 mb-1">
                    <div className="flex gap-2 items-center w-full">
                        <label className={`
                             ${isScrolled && "bg-opacity-50 bg-white border border-neutral-300"}
                            input input-sm md:input-md input-bordered rounded-full w-full flex items-center gap-2`}>
                            <IoIosSearch className={`${searchTerm === "" && "opacity-45"}`} />
                            <input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                type="text"
                                className={`grow`}
                                placeholder="Search" />

                            <button
                                onClick={handleResetSearch}
                                className="active:scale-90 duration-300"
                            >
                                <IoIosCloseCircle
                                    className={`${searchTerm !== "" ? "block  md:text-2xl -mr-1 opacity-40" : "hidden"}`} />
                            </button>
                        </label>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className={`
                              ${isScrolled && "bg-opacity-50 bg-white border border-neutral-300"}
                             btn btn-sm md:btn-md rounded-full m-1`}>
                                Sort
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                                <li
                                    className={`${sortCriteria === "cheapest" ? "bg-mainColor dark:bg-mainColorD rounded-lg dark:text-darkColor text-white" : ""
                                        }`}
                                >
                                    <a onClick={() => handleSortChange("cheapest")}>Termurah</a>
                                </li>
                                <li
                                    className={`${sortCriteria === "expensive" ? "bg-mainColor dark:bg-mainColorD rounded-lg dark:text-darkColor text-white" : ""
                                        }`}
                                >
                                    <a onClick={() => handleSortChange("expensive")}>Termahal</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Category Carousel */}
                <div className="relative">
                    <div className="carousel2 w-full gap-2">
                        {uniqueCategories.map((category, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCategoryChange(category)}
                                className={`
                                ${category === selectedCategory && "!bg-mainColor text-white bg-opacity-100"} 
                                ${idx === 0 ? "ml-5 md:ml-10" : ""} 
                                ${idx === uniqueCategories.length - 1 ? "mr-5 md:mr-10" : ""}
                                ${isScrolled && "bg-opacity-50 bg-white border border-neutral-300"}
                                relative px-4 py-2 carousel-item text-xs md:text-sm bg-bgLight rounded-full font-medium flex gap-2 items-center`}
                            >
                                {category}
                                {/* Show the 'X' icon next to the selected category */}
                                {category === selectedCategory && category !== "All" && (
                                    <>
                                        <span
                                            className="text-white ml-2 cursor-pointer"
                                        >
                                            <IoIosCloseCircle />
                                        </span>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the button's click event from triggering
                                                handleResetFilters(); // Reset the category filter
                                            }}
                                            className="w-10 h-full absolute right-0 top-0"></div>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
