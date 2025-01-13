import Image from "next/image"
// import { products } from "../../public/DB"
import { formatToRupiah } from "@/helper/formatToRupiah"
import { IoCopyOutline } from "react-icons/io5";
export const Card = ({ products, visibleCount, setVisibleCount, isSearching }) => {
    const dataDisplayed = products.slice(0, visibleCount);

    // Handle load more functionality
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Increment count by 6
    };
    return (
        <>
            <section className="md:mx-10 mx-5 py-10">
                <div className={`grid grid-cols-2 md:grid-cols-5 md:gap-7 gap-y-7`}>
                    {dataDisplayed.map((el, idx) => (
                        <a
                            className="hover:md:p-3 hover:p-[5px] flex flex-col rounded-lg duration-300 ease-in-out md:hover:shadow-mainShadow md:hover:-translate-y-1 space-y-2"
                            key={idx}
                            href=""
                        >
                            <div className="flex flex-col gap-2 justify-between flex-grow">
                                <Image
                                    className="rounded-lg md:h-[30lvh] object-cover"
                                    width={500}
                                    height={500}
                                    src={el.thumbnailURL}
                                    alt=""
                                />
                                <div className="">
                                    <div className="flex flex-col">
                                        <p className="opacity-50 rounded-md text-[11px] font-semibold uppercase w-fit">
                                            {el.category}
                                        </p>
                                        <h1 className="md:text-lg">
                                            {el.productName}
                                        </h1>
                                    </div>
                                    <p className="md:text-lg font-bold">
                                        {formatToRupiah(el.priceIDR)}
                                    </p>
                                    <div className="text-sm opacity-70 flex gap-2 flex-wrap">
                                        <p>
                                            Stock : {el.stock}
                                        </p>
                                        {el.sizes ? (
                                            <div className="flex flex-wrap items-center gap-1">
                                                <p>
                                                    Size:
                                                </p>
                                                {el.sizes.map((size, idx) => (
                                                    <p key={idx} className="px-[4px] py-[1px] flex items-center justify-center font-medium bg-secondaryBase rounded-md">
                                                        {size}
                                                    </p>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="hidden md:flex md:flex-row gap-2 w-full mt-5">
                                        <button className="px-4 py-1 w-full md:w-fit border border-neutral-200 text-neutral-600 rounded-full">
                                            Pilih
                                        </button>
                                        <button className="px-4 py-1 w-full justify-center flex gap-2 items-center bg-neutral-100 text-neutral-600 truncate rounded-full">
                                            <IoCopyOutline />
                                            Copy Produk
                                        </button>
                                    </div>
                                </div>
                                <div className="md:hidden flex flex-row gap-2 w-full mt-5 text-sm">
                                    <button className="px-4 py-1 w-full md:w-fit border border-neutral-200 text-neutral-600 rounded-full">
                                        Pilih
                                    </button>
                                    <button className="btn btn-sm btn-circle bg-neutral-100 text-neutral-600 truncate rounded-full">
                                        <IoCopyOutline />
                                    </button>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                {/* Kondisi tombol Load More */}
                {visibleCount < products.length && (
                    <div className="py-5 w-full flex justify-center items-center">
                        <button
                            onClick={handleLoadMore}
                            className="active:scale-95 hover:brightness-90 duration-300 px-4 py-2 bg-black dark:bg-white text-bgLight dark:text-darkColor rounded-full font-semibold">
                            Load More
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}