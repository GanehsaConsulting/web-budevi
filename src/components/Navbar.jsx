"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavbarItems } from "../../public/System";
import ThemeSwitch from "./ThemeSwitch";
import { ProductsMegaMenu } from "./ProductsMegaMenu";
import { MegaMenuNavbar } from "./MegaMenuNavbar";
import { IoIosSearch } from "react-icons/io";
import { SearchMegaMenu } from "./SearchMegaMenu";
import { BsSearch } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import BurgerButton from "./BurgerButton";
// import { MegaMenuNavbar } from "./MegaMenuNavbar";

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
            <div className={`fixed z-[999] navbar2 h-[50px] duration-300 ease-in-out
                            ${isExpanded && "translate-y-0"}
                            ${visible ? "translate-y-0" : "-translate-y-full"}
                            ${isScrolled ? "bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl" : "bg-transparent"}
                            `}>
                <div className="navbar-start md:ml-[30px] ml-[10px]">
                    <a className="md:text-xl z-[888]">Shupi</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {NavbarItems.slice(0, 1).map((el, idx) => (
                            <li key={idx} className="z-[888]">
                                <a
                                    href={el.href}
                                >
                                    {el.label}
                                </a>
                            </li>
                        ))}
                        <MegaMenuNavbar
                            title="Product"
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                            children={
                                <ProductsMegaMenu isExpanded={isExpanded} />
                            }
                        />
                        {NavbarItems.slice(2, 4).map((el, idx) => (
                            <li key={idx} className="z-[888]">
                                <a
                                    href={el.href}
                                >
                                    {el.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end md:mr-[30px] mr-[10px] space-x-4 md:space-x-1">
                    <div className="hidden md:block">
                        <MegaMenuNavbar
                            className={'group-hover:rotate-90'}
                            icon={
                                <div className="group text-xl text-neutral-500 dark:text-neutral-300">
                                    <IoSearch />
                                </div>
                            }
                            arrowVisibility={'hidden'}
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                            children={
                                <SearchMegaMenu isExpanded={isExpanded} />
                            }
                        />
                    </div>
                    <div className="block md:hidden">
                        <MegaMenuNavbar
                            burger={
                                <BurgerButton isExpanded={isExpanded} />
                            }
                            arrowVisibility={'hidden'}
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                            children={
                                <SearchMegaMenu isExpanded={isExpanded} />
                            }
                        />
                    </div>
                    <div className="order-first md:order-none">
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
            <div
                onClick={handleToggleExpand}
                className={`fixed z-[990] ${isExpanded ? "opacity-100 backdrop-blur-xl md:backdrop-blur-[30px] w-screen h-screen" : "opacity-0"} bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 transition-opacity duration-300`}></div>

        </>
    )
}