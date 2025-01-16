'use client'
import { IoIosArrowDown } from 'react-icons/io';

export const MegaMenuNavbar = ({ index, title, links, isExpanded, setIsExpanded, children, arrowVisibility, label, icon }) => {

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="relative group flex items-center overflow-visible">
            {icon && (
                <>
                    <div
                        onClick={handleToggleExpand}
                        className="z-[1000] overflow-hidden md:w-[35px] w-[32px] md:h-[35px] h-[32px] flex items-center justify-center duration-300 ease-in-out shadow-custom swap-on rounded-full">
                        <div className={`md:flex flex-col hidden`}>
                            <span className={`group-hover:rotate-90 duration-300 ease-in-out`}>
                                {icon}
                            </span>
                        </div>
                    </div>

                </>
            )}
            <div
                className="relative group cursor-pointer gap-1 flex items-center text-gray-800 dark:text-white rounded md:p-0">
                <div className={`flex flex-col justify-center items-center hover:opacity-100`}>
                    <div
                        onClick={handleToggleExpand}
                        onMouseEnter={() => setIsExpanded(true)}
                        onMouseLeave={() => setIsExpanded(false)}
                        className={`z-[999]`}>
                        {title}
                    </div>
                </div>
                <span className={`${arrowVisibility} group-hover:rotate-180 duration-300 ease-in-out z-[888]`}>
                    <IoIosArrowDown />
                </span>
            </div>

            {/* Mega Menu Dropdown */}
            <div
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`-z fixed left-0 right-0 top-0 pt-[54px] pb-10 transform opacity-0 max-h-0 pointer-events-none transition-all duration-700 ease-in-out origin-top bg-white dark:bg-black shadow-mainShadow
                    ${isExpanded
                        ?
                        "group group-hover:opacity-100 group-hover:max-h-screen md:group-hover:max-h-[800px] overflow-y-scroll noBar group-hover:pointer-events-auto"
                        :
                        "opacity-0 max-h-0"
                    } 
                   `}
            >
                {label === undefined ? null : (
                    <div
                        onMouseEnter={() => setIsExpanded(true)}
                        onMouseLeave={() => setIsExpanded(false)}
                        onClick={handleToggleExpand}
                        className={`group md:mx-[94px] px-[-94px] pt-[40px] py-5 h-fit !z-[999]`}>

                        <div className="grid grid-cols-3 gap-10">
                            <div className="space-y-4">
                                <p className="text-xs uppercase font-medium opacity-50">
                                    {label}
                                </p>
                                <div className="flex flex-col gap-4">
                                    {links.map((el, idx) => (
                                        <a
                                            className={`${isExpanded ? `-translate-y-0 opacity-100` : `-translate-y-10 opacity-0`}`}
                                            style={{ transitionDelay: `${index * 80}ms` }}
                                            key={idx}
                                            href={el.href}
                                        >
                                            {el.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {children && (
                    <div
                        className='group md:mx-10 py-5 h-fit !z-[999]'
                    >
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
