"use client"
import { useEffect, useState } from "react";
import { products } from "../../public/DB";
import { usePathname } from "next/navigation";

export const Filter = ({ onSearch, onSort }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hovering, setHovering] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const pathname = usePathname();

    // Fungsi untuk mengecek apakah link aktif
    const isActive = (path) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
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
    const [sortCriteria, setSortCriteria] = useState("cheapest"); // Default sort: newest

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

    return (
        <>
            <section className={`
                ${visible && isScrolled ? "translate-y-[52px] top-0" : "-translate-y-[50%] top-[54px]"}
                ${!isScrolled && "-translate-y-0"}
                duration-300 sticky z-[888] bg-white bg-opacity-80 backdrop-blur-xl py-2`}>
                <div className="md:mx-10 mx-5 mb-1">
                    <div className="flex gap-2 items-center w-full">
                        <label className={`
                             ${isScrolled && "bg-opacity-50 bg-white border border-neutral-300"}
                            input input-bordered rounded-full w-full flex items-center gap-2`}>
                            <input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                type="text"
                                className={`grow`}
                                placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className={`
                              ${isScrolled && "bg-opacity-50 bg-white border border-neutral-300"}
                             btn rounded-full m-1`}>
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
                <div className="relative">
                    <div className="carousel2 w-full gap-2">
                        {uniqueCategories.map((category, idx) => (
                            <button
                                key={idx}
                                className={`
                        ${idx === 0 ? "ml-5 md:ml-10" : ""} ${idx === uniqueCategories.length - 1 ? "mr-5 md:mr-10" : ""}
                        ${isScrolled && "bg-opacity-50 bg-white border border-neutral-300"}
                        px-4 py-2 carousel-item text-sm bg-bgLight rounded-full font-medium`}
                            >
                                {category}
                            </button>
                        ))}
                        {/* <div className="absolute right-0 top-0 w-12 h-full pointer-events-none bg-gradient-to-l from-white via-white to-transparent z-10"></div> */}
                        {/* <div className="absolute left-0 top-0 w-12 h-full pointer-events-none bg-gradient-to-r from-white via-white to-transparent z-10"></div> */}
                    </div>
                </div>
            </section>
        </>
    )
}