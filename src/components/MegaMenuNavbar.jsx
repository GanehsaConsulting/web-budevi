'use client'
import { IoIosArrowDown } from 'react-icons/io';

export const MegaMenuNavbar = ({ index, title, links, isExpanded, setIsExpanded, children, arrowVisibility, label, icon, className, burger }) => {

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={` relative group flex items-center overflow-visible`}>
            {burger && (
                <>
                    <div
                        onClick={handleToggleExpand}
                        className="z-[9999]">
                        <div className={`${className} duration-300 ease-in-out`}>
                            {burger}
                        </div>
                    </div>

                </>
            )}
            {icon && (
                <>
                    <div
                        onClick={handleToggleExpand}
                        className="z-[9999] md:w-[35px] w-[32px] md:h-[35px] h-[32px] flex items-center justify-center duration-300 ease-in-out rounded-full">
                        <div className={`${className} duration-300 ease-in-out`}>
                            {icon}
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

            {isExpanded && (
                <>
                    <div className={`fixed top-0 left-0 right-0 h-screen bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 backdrop-blur-xl w-full z-[555]
                        `}>
                        <div className='my-24'>
                                     {children}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};
