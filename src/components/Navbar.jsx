"use client"
import { useState, useEffect } from "react";
import { NavbarItems } from "../../public/System";
import { MegaMenuNavbar } from "./MegaMenuNavbar";
import { MobileDrawer } from "./MobileDrawer";
import { RiCustomerServiceFill } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import BurgerButton from "./BurgerButton";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

export const Navbar = ({ children }) => {
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);


    return (
        <>
            <div className={`z-[999] navbar2 h-[40px] md:h-[50px] duration-300 ease-in-out`}>
                <div className={`navbar-start md:ml-[30px] ml-[10px]`}>

                    <a href="/" className="md:text-xl z-[99] font-medium">Sinar Lotus</a>
                </div>
                <div className="navbar-center hidden">
                    <a href="/" className="md:text-xl z-[888] font-medium hover:scale-105 active:scale-75 duration-300">Sinar Lotus</a>
                </div>
                <div className="navbar-end md:mr-[30px] mr-[10px] space-x-4 md:space-x-5">
                    <ThemeSwitch />
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button" className="active:scale-90 duration-300">
                            <BurgerButton isExpanded={isExpanded} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-mainColorD dark:bg-darkColor rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {NavbarItems.map((el, idx) => (
                                <li key={idx}>
                                    <a href={el.href}
                                    >
                                        {el.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        href="/contact"
                        className="active:scale-95 md:pr-3 md:pl-2 md:py-[2px] flex items-center gap-1 md:text-neutral-800 md:dark:text-neutral-800 md:bg-neutral-300 font-semibold md:text-sm rounded-full text-neutral-500 dark:text-neutral-300"
                    >
                        <span className="md:block hidden">
                            Kontak
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}