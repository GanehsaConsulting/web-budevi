"use client";
import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import ProductPDF from "./ProductPDF";
import { MdPictureAsPdf } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { IoIosClose, IoIosDownload } from "react-icons/io";
import { IoDownload } from "react-icons/io5";

const ProductPDFPreview = ({ products, toggle, icon, className, dataTip }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showModal]);

    const generatePreview = async () => {
        setIsLoading(true);
        try {
            const blob = await pdf(<ProductPDF toggle={toggle} products={products} />).toBlob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setShowModal(true);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setPdfUrl(null);
    };

    return (
        <>
            <button
                data-tip={dataTip}
                onClick={generatePreview}
                className={`${isLoading && "bg-opacity-50 animate-pulse backdrop-blur-md"} ${className} tooltip tooltip-right bg-secondaryColor text-xl hover:scale-95 duration-300 ease-in-out text-white font-bold py-3 px-3 rounded-full shadow-lg flex items-center justify-center`}
            >
                {isLoading ? (
                    <LuLoader className="animate-spin" />
                ) : !icon ? (
                    <MdPictureAsPdf />
                ) : (
                    icon
                )}
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-neutral-500/50 backdrop-blur-sm !z-[9999]" onClick={closeModal}>
                    <div className="flex flex-col items-center justify-center w-[100%] h-full p-5 space-y-2" onClick={(e) => e.stopPropagation()}>
                        {pdfUrl && (
                            <iframe
                                src={pdfUrl}
                                className="w-full h-[80lvh] md:h-[100vh] rounded-lg shadow"
                            />
                        )}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-1 items-end">
                            <button
                                data-tip="Cancel"
                                onClick={closeModal}
                                className="tooltip tooltip-left hidden md:block px-[2px] py-[2px] text-4xl bg-red-600 text-white rounded-full duration-300 shadow hover:bg-red-600 transition"
                            >
                                <IoIosClose />
                            </button>
                            <div className="flex items-center justify-center gap-3">
                                {pdfUrl && (
                                    <a
                                        data-tip="Download PDF"
                                        href={pdfUrl}
                                        download="Sinar-Lotus-product-list.pdf"
                                        className="tooltip tooltip-left px-[7px] py-[7px] text-2xl bg-secondaryColor font-medium text-white rounded-full shadow hover:bg-secondaryColor/80"
                                    >
                                        <IoIosDownload />
                                    </a>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="md:hidden absolute top-0 md:top-[-8px] md:right-[-8px] right-0 px-1 py-1 text-4xl hover:bg-red-600 text-white rounded-full duration-300 hover:shadow transition"
                        >
                            <IoIosClose />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductPDFPreview;
