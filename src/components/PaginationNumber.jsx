import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export const PaginationNumber = ({ totalPages, currentPage, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState(5);

    const getPageNumbers = () => {
        const pages = [];
        const halfVisible = Math.floor(visiblePages / 2);
        let start = Math.max(1, currentPage - halfVisible);
        let end = Math.min(totalPages, start + visiblePages - 1);

        if (end - start + 1 < visiblePages) {
            start = Math.max(1, end - visiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <section className="w-full h-full flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
                <button
                    className="px-3 py-1 rounded-full disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <IoIosArrowBack />
                </button>
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 rounded-full ${currentPage === page ? 'bg-secondaryColor text-white' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="px-3 py-1 rounded-full disabled:opacity-50 rotate-180"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <IoIosArrowBack />
                </button>
            </div>
        </section>
    );
};
