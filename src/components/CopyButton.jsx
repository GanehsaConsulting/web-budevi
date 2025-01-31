import { formatToRupiah } from "@/helper/formatToRupiah";
import { IoCopyOutline } from "react-icons/io5";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const CopyButton = ({ className, product, variant }) => {
    const formatProductText = (product, selectedVariant) => {
        return `
Nama Produk: ${product.category} ${selectedVariant.name}
Kategori: ${product.category}
URL Gambar: ${product.thumbnailURL}
Harga: ${formatToRupiah(selectedVariant.price)}
Unit: ${selectedVariant.unit}
        `;
    };

    const handleCopyProduct = () => {
        const productText = formatProductText(product, variant);
        navigator.clipboard.writeText(productText);
        Toastify({
            text: "Produk berhasil disalin!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
        }).showToast();
    };

    return (
        <button onClick={handleCopyProduct} className={`${className} group-active:scale-90 btn-sm flex items-center gap-2 px-2 py-1 group-hover:bg-[#0000006d] backdrop-blur-0 group-hover:backdrop-blur-lg bg-opacity-0 group-hover:bg-opacity-100 ease-in-out rounded-full translate-x-12 group-hover:translate-x-0 duration-300`}>
            <div className="bg-[#0000006d] p-2 group-hover:p-0 rounded-full group-hover:bg-transparent">
                <IoCopyOutline />
            </div>
            <span className="scale-0 translate-x-20 group-hover:scale-100 group-hover:translate-x-0 duration-300">
                Copy
            </span>
        </button>
    );
};
