"use client";
import { useEffect, useState } from "react";

import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { prod } from "../../public/DB";
import { SwitchView } from "./SwitchView";

export const Filter = ({
    onSearch,
    onSort,
    onCategoryChange,
    onResetFilters,
    selectedCategories,
    child,
    toggle,
    updateToggle
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible]);

    const data = prod;

    // Extract unique categories
    const uniqueCategories = [];
    data.forEach((el) => {
        if (!uniqueCategories.includes(el.category)) {
            uniqueCategories.push(el.category);
        }
    });

    // Sort Categoris by Aplhabet
    uniqueCategories.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const [sortCriteria, setSortCriteria] = useState("cheapest"); // Default sort: cheapest
    const [searchTerm, setSearchTerm] = useState("");

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

    // Handle multi-category selection
    const handleCategoryToggle = (category) => {
        let updatedCategories = [...selectedCategories];
        if (updatedCategories.includes(category)) {
            updatedCategories = updatedCategories.filter((cat) => cat !== category);
        } else {
            updatedCategories.push(category);
        }
        onCategoryChange(updatedCategories); // Pass updated categories to parent component
    };

    // Reset filters
    const handleResetFiltersLocal = () => {
        setSearchTerm(""); // Reset search term locally
        onResetFilters(); // Call parent reset function
    };

    return (
        <>
            <section
                className={`
                    ${visible && isScrolled ? "translate-y-[40px] md:translate-y-[50px]" : "-translate-y-[0%]"} 
                    ${!isScrolled && "-translate-y-0"}
                     duration-300 sticky z-[888] bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl py-1 md:py-1 top-0`}
            >
                <div className="md:mx-10 mx-5">
                    <div className={`${isScrolled && "pt-1 md:pt-0"} flex md:flex-row flex-col gap-1 md:gap-2 items-center w-full`}>
                        <label
                            className={`${isScrolled && "bg-opacity-50 bg-white dark:bg-black dark:border-neutral-700 dark:bg-opacity-50 border border-neutral-300"} bg-bgLight dark:bg-darkColor input input-sm md:input-md md:h-[40px] rounded-full w-full flex items-center gap-2`}
                        >
                            <IoIosSearch className={`${searchTerm === "" && "opacity-45"}`} />
                            <input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                type="text"
                                className={`grow`}
                                placeholder="Search"
                            />
                            <button
                                onClick={handleResetSearch}
                                className="active:scale-90 duration-300"
                            >
                                <IoIosCloseCircle
                                    className={`${searchTerm !== ""
                                        ? "block  md:text-2xl -mr-1 opacity-40"
                                        : "hidden"
                                        }`}
                                />
                            </button>
                        </label>
                        <div className="flex md:flex-row items-center md:w-fit w-full gap-1 md:gap-1">
                            <SwitchView
                                isScrolled={isScrolled}
                                toggle={toggle}
                                updateToggle={updateToggle} />
                            <div>
                                <button
                                    onClick={() => document.getElementById("my_modal_5").showModal()}
                                    className={`${isScrolled && "bg-opacity-50 bg-white border !border-neutral-300 dark:bg-black dark:bg-opacity-50 dark:!border-neutral-700"}
                                    md:h-[40px] h-[32px] w-full px-4 md:w-[100px] flex  items-center justify-center border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-900 duration-300 rounded-full m-1 bg-bgLight dark:bg-darkColor text-neutral-800 dark:text-neutral-400`}
                                >
                                    <span className="flex gap-2 items-center">
                                        Filter
                                        <HiAdjustmentsHorizontal />
                                    </span>
                                </button>
                                <dialog
                                    id="my_modal_5"
                                    className="modal modal-bottom sm:modal-middle"
                                >
                                    <div className="modal-box dark:bg-darkColor bg-bgLight space-y-5">
                                        <div className="space-y-3">
                                            <p className="opacity-70 font-medium">Kategori Produk</p>
                                            <div className="flex flex-wrap justify-between w-full gap-2">
                                                {uniqueCategories.map((category, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleCategoryToggle(category)}
                                                        className={`
                                                ${selectedCategories.includes(category) && "!bg-mainColor dark:!bg-mainColorD text-white bg-opacity-100"} 
                                                relative px-4 py-2 text-xs md:text-sm grow bg-white dark:bg-black rounded-full font-medium flex gap-2 items-center justify-center border border-neutral-300 dark:border-neutral-700`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                                {selectedCategories.length > 0 && (
                                                    <button
                                                        onClick={handleResetFiltersLocal}
                                                        className={`relative px-4 py-2 text-xs md:text-sm grow bg-white dark:bg-black invert rounded-full font-medium flex gap-2 items-center justify-center border border-neutral-300 dark:border-neutral-700`}
                                                    >
                                                        Reset Filter
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="opacity-70 font-medium">Urutkan Produk</p>
                                            <ul className="flex gap-2">
                                                <li
                                                    className={`${sortCriteria === "cheapest"
                                                        ? "!bg-mainColor dark:!bg-mainColorD text-white bg-opacity-100"
                                                        : ""
                                                        } px-4 py-2 text-xs md:text-sm grow bg-white dark:bg-black rounded-full font-medium flex gap-2 items-center justify-center border border-neutral-300 dark:border-neutral-700`}
                                                >
                                                    <a onClick={() => handleSortChange("cheapest")}>
                                                        Termurah
                                                    </a>
                                                </li>
                                                <li
                                                    className={`${sortCriteria === "expensive"
                                                        ? "!bg-mainColor dark:!bg-mainColorD text-white bg-opacity-100"
                                                        : ""
                                                        } px-4 py-2 text-xs md:text-sm grow bg-white dark:bg-black rounded-full font-medium flex gap-2 items-center justify-center border border-neutral-300 dark:border-neutral-700`}
                                                >
                                                    <a onClick={() => handleSortChange("expensive")}>
                                                        Termahal
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn wf bg-red-500 dark:bg-red-900 rounded-full border-none text-white">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {selectedCategories.length > 0 && (
                <div className={`duration-300 sticky z-[888] bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl pb-1 pt-[1px] top-[48px] md:top-[50px]
                    ${visible && isScrolled ? "translate-y-[50px]" : "-translate-y-[0%]"} 
                
                `}>

                    <div className="md:mt-[3px] carousel2 w-full gap-2">
                        {selectedCategories.map((category, idx) => (
                            <span
                                key={idx}
                                className={`${idx === 0 && "md:ml-10 ml-5"} 
                        carousel-item flex items-center gap-2 px-3 py-1 bg-mainColor btn btn-xs text-white rounded-full border border-transparent`}
                            >
                                {category}
                                <IoIosCloseCircle
                                    className="cursor-pointer"
                                    onClick={() => handleCategoryToggle(category)}
                                />
                            </span>
                        ))}
                        <button
                            onClick={handleResetFiltersLocal}
                            className={`carousel-item md:mr-10 mr-5 flex items-center gap-2 px-3 py-1 bg-black btn btn-xs text-white dark:invert rounded-full`}
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
