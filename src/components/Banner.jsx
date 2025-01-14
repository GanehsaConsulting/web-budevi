"use client"
import { products } from "../../public/DB";
import { brandIdentity } from "../../public/System";

export const Banner = () => {


    return (
        <section className="patternDots dark:invert relative">
            <div className=" md:pt-32 pt-24 pb-10 md:pb-24 md:px-10 px-5 dark:text-black">
                <h1 className="text-center text-xl font-medium">
                    {brandIdentity.banner.taglineShort}
                </h1>
                <h2 className="text-center">
                    {brandIdentity.banner.taglineLong}
                </h2>
            </div>
            <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
};
