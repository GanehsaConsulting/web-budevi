"use client"
import Image from "next/image";
import { PiFlowerLotusLight } from "react-icons/pi";
import { brandIdentity } from "../../public/System";

export const Banner = () => {

    return (
        <>
            <section className="md:mx-10 mx-5 md:pt-[53px] pt-[43px] md:pb-[35px] pb-[10px]">
                <div className="relative group">
                    <Image
                        width={1000}
                        height={1000}
                        className="z-[50] w-full h-[30lvh] md:h-[40lvh] object-cover dark:brightness-75 brightness-90 rounded-xl md:rounded-2xl"
                        src="https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=2990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <Image
                        width={1}
                        height={1}
                        className="absolute inset-0 -z-20 w-full h-[30lvh] md:h-[40lvh] object-cover dark:brightness-75 brightness-90 rounded-xl md:rounded-2xl"
                        src="https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=2990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <div className="rounded-none h-[50%] duration-300 group-hover:h-[150%] w-full gradient-blur bg-gradient-to-t from-[#916d3d4c] to-transparent rounded-b-xl md:rounded-b-2xl"></div>
                    <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 md:w-[50%] text-white">
                        <h1 className="flex items-end gap-2 text-2xl md:text-4xl font-medium opacity-80 brightness-105">
                            Sinar Lotus
                            <PiFlowerLotusLight />
                        </h1>
                        <h2 className="opacity-80 text-sm">
                            {brandIdentity.banner.taglineShort}
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
