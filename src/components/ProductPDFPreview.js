"use client";
import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ProductPDF from "./ProductPDF";
import { MdPictureAsPdf } from "react-icons/md";
import { LuLoader } from "react-icons/lu";

const ProductPDFPreview = ({ products, toggle, icon, className, dataTip }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State untuk loading

    // Generate PDF dan set URL
    const generatePreview = async () => {
        setIsLoading(true); // Aktifkan loading sebelum proses mulai
        try {
            const blob = await pdf(<ProductPDF toggle={toggle} products={products} />).toBlob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setShowModal(true);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsLoading(false); // Matikan loading setelah selesai
        }
    };

    // Menutup modal
    const closeModal = () => {
        setShowModal(false);
        setPdfUrl(null);
    };

    return (
        <>
            {/* Button untuk generate PDF */}
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

            {/* Modal Preview PDF */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-neutral-500/50 backdrop-blur-sm !z-[9999]">
                    <div className="w-[100%] h-full p-5 space-y-2">
                        {/* Preview PDF */}
                        {pdfUrl && (
                            <iframe
                                src={pdfUrl}
                                className="w-full h-[90vh] rounded-lg shadow"
                            />
                        )}

                        <div className="flex items-center justify-center gap-3">
                            {/* Tombol Download PDF */}
                            {pdfUrl && (
                                <a
                                    href={pdfUrl}
                                    download="product-list.pdf"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                                >
                                    Download PDF
                                </a>
                            )}

                            {/* Tombol Tutup Modal */}
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductPDFPreview;
