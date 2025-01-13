import Image from "next/image"
import { products } from "../../public/DB"
import { formatToRupiah } from "@/helper/formatToRupiah"

export const Card = () => {
    return (
        <>
            <section className="md:mx-10 mx-5 py-10">
                <div className="grid grid-cols-5 gap-5">
                    {products.map((el, idx) => (
                        <a
                            className="p-3 shadow-mainShadow rounded-xl space-y-2"
                            key={idx}
                            href=""
                        >
                            <Image
                                className="rounded-lg md:h-[30lvh] object-cover"
                                width={500}
                                height={500}
                                src={el.thumbnailURL}
                                alt=""
                            />
                            <div>
                                <div className="flex gap-2 items-center">
                                    <p className="px-[4px] py-[1px] bg-neutral-600 opacity-70 rounded-md text-[10px] uppercase text-white w-fit">
                                        {el.category}
                                    </p>
                                    <h1 className="text-lg">
                                        {el.productName}
                                    </h1>
                                </div>
                                <p className="text-lg font-bold">
                                    {formatToRupiah(el.priceIDR)}
                                </p>
                                <div className="text-sm opacity-70 flex gap-2 flex-wrap">
                                    <p>
                                        Stock : {el.stock}
                                    </p>
                                    {el.sizes ? (
                                        <div className="flex items-center gap-1">
                                            <p>
                                                Size:
                                            </p>
                                            {el.sizes.map((size, idx) => (
                                                <p key={idx} className="px-[4px] py-[1px] flex items-center justify-center font-semibold bg-secondaryBase rounded-md">
                                                    {size}
                                                </p>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    )
}