"use client"
import Image from "next/image";
import { PiFlowerLotusLight } from "react-icons/pi";
import { brandIdentity } from "../../public/System";

export const Banner = ({ imgUrl, head, desc }) => {

    return (
        <>
            <section className="md:mx-10 mx-5 md:pb-[35px] pb-[10px]">
                <div className="relative group">
                    <Image
                        width={1000}
                        height={1000}
                        className="z-[50] w-full h-[30lvh] md:h-[40lvh] object-cover dark:brightness-75 brightness-90 rounded-xl md:rounded-2xl bg-secondaryColorD"
                        src={imgUrl}
                        alt="Banner Images"
                    />
                    <Image
                        width={1}
                        height={1}
                        className="absolute inset-0 -z-20 w-full h-[30lvh] md:h-[40lvh] object-cover rounded-xl md:rounded-2xl bg-secondaryColorD"
                        src={imgUrl}
                        alt="Banner Images"
                    />
                    <div className="rounded-none h-[50%] w-full gradient-blur bg-gradient-to-t from-[#7979794c] to-transparent rounded-b-xl md:rounded-b-2xl"></div>
                    <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 md:w-[50%] text-white">
                        <h1 className="flex items-end gap-2 text-2xl md:text-4xl font-medium opacity-80 brightness-105">
                            {head}
                        </h1>
                        <h2 className="opacity-80 text-sm">
                            {desc}
                        </h2>
                    </div>
                </div>
            </section>
        </>
        // <section className="patternDots dark:invert relative">
        //     <div className=" md:pt-32 pt-24 pb-10 md:pb-24 md:px-10 px-5 dark:text-black">
        //         <h1 className="text-center text-xl font-medium">
        //             {brandIdentity.banner.taglineShort}
        //         </h1>
        //         <h2 className="text-center">
        //             {brandIdentity.banner.taglineLong}
        //         </h2>
        //     </div>
        //     <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-white to-transparent"></div>
        // </section>
    );
};
