"use client"
import { products } from "../../public/DB";
import { brandIdentity } from "../../public/System";

export const Banner = () => {


    return (
        <section className="md:pt-32 pt-24 pb-10 md:pb-24 md:px-10 px-5">
            <h1 className="text-center text-xl font-medium">
                {brandIdentity.banner.taglineShort}
            </h1>
            <h2 className="text-center">
                {brandIdentity.banner.taglineLong}
            </h2>
        </section>
    );
};
