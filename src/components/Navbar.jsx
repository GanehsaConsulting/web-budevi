"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavbarItems } from "../../public/System";
import ThemeSwitch from "./ThemeSwitch";
import { ProductsMegaMenu } from "./ProductsMegaMenu";
import { MegaMenuNavbar } from "./MegaMenuNavbar";
import { IoIosSearch } from "react-icons/io";
// import { MegaMenuNavbar } from "./MegaMenuNavbar";

export const Navbar = ({ children }) => {
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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
            <div className={`fixed z-[999] navbar2 h-[50px]
                            ${isExpanded && "translate-y-0"}
                            ${visible ? "translate-y-0" : "-translate-y-full"}
                            ${isScrolled ? "bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl" : "bg-transparent"}
                            `}>
                <div className="navbar-start md:ml-[30px] -ml-[3px]">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="text-xl z-[888]">Shupi</a>
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
                            <li key={idx}>
                                <a
                                    href={el.href}
                                >
                                    {el.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end md:mr-[30px] mr-[15px] space-x-2">
                    <MegaMenuNavbar
                        title={
                            <div className="p-[6px] border border-neutral-400 rounded-full text-white group">
                                <IoIosSearch className="group-active:rotate-90 duration-300 ease-in-out" />
                            </div>
                        }
                        arrowVisibility={'hidden'}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                        children={
                            <ProductsMegaMenu isExpanded={isExpanded} />
                        }
                    />
                    <ThemeSwitch />
                </div>
            </div>
            <div className={`fixed z-[80] ${isExpanded ? "opacity-100 backdrop-blur-xl md:backdrop-blur-[30px] w-screen h-screen" : "opacity-0"} bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 transition-opacity duration-300`}></div>

        </>
    )
}