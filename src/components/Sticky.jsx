"use client"

import { useEffect, useState } from "react";

export const Sticky = ({ children }) => {
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible]);
    return (
        <>
            <section className={`
                ${visible && isScrolled ? "translate-y-[40px] md:translate-y-[50px]" : "-translate-y-[0%]"} 
                ${!isScrolled && "-translate-y-0"}
                md:px-10 px-5 mb-6 flex items-center gap-2  duration-300 sticky z-[888] bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl py-1 md:py-1 top-0`}>
                {children}
            </section>
        </>
    )
}