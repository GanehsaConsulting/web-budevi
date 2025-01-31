"use client"
import { useState, useEffect } from "react";
import { NavbarItems } from "../../public/System";
import { MegaMenuNavbar } from "./MegaMenuNavbar";
import { MobileDrawer } from "./MobileDrawer";
import { RiCustomerServiceFill } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import BurgerButton from "./BurgerButton";
import ThemeSwitch from "./ThemeSwitch";

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
            <div className={`fixed z-[999] navbar2 h-[40px] md:h-[50px] duration-300 ease-in-out
                            ${isExpanded && "translate-y-0"}
                            ${visible ? "translate-y-0" : "-translate-y-full"}
                            ${isScrolled ? "bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl" : "bg-transparent"}
                            `}>
                <div className={`navbar-start md:ml-[30px] ml-[10px]`}>
                    <div className="dropdown md:block hidden">
                        <div tabIndex={0} role="button" className="active:scale-90 duration-300">
                            <LuMenu />
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
                    <a href="/" className="md:text-xl z-[888] font-medium md:hidden block">Sinar Lotus</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <a href="/" className="md:text-xl z-[888] font-medium hover:scale-105 active:scale-75 duration-300">Sinar Lotus</a>
                </div>
                <div className="navbar-end md:mr-[30px] mr-[10px] space-x-4 md:space-x-3">
                    <ThemeSwitch />
                    <a
                        href="/contact"
                        className="active:scale-95 md:pr-3 md:pl-2 md:py-[2px] flex items-center gap-1 md:text-neutral-800 md:dark:text-neutral-800 md:bg-neutral-300 font-semibold md:text-sm rounded-full text-neutral-500 dark:text-neutral-300"
                    >
                        <RiCustomerServiceFill className="" />
                        <span className="md:block hidden">
                            Kontak
                        </span>
                    </a>
                    <div className="block md:hidden">
                        <MegaMenuNavbar
                            arrowVisibility={'hidden'}
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                            burger={<BurgerButton isExpanded={isExpanded} />}
                            children={<MobileDrawer isExpanded={isExpanded} />}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}