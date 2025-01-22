'use client'
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowDown } from "react-icons/io5";
import { PiArrowDown } from "react-icons/pi";
import { RiArrowDownWideFill } from "react-icons/ri";
import { SlArrowDown } from "react-icons/sl";

export const ExpandableButton = ({ children, label, className, order, align, classNameInner, contentH, arrowType }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isExpanded ? `${contentRef.current.scrollHeight + 20}px` : contentH);
        }
    }, [isExpanded]);

    return (
        <>
            <div className={`${align} flex flex-col`}>
                <div
                    className={`overflow-hidden transition-all w-full duration-700 ease-in-out ${order} hover:cursor-pointer ${isExpanded ? 'max-h-full h-full' : 'max-h-0'}`}
                    style={{ maxHeight: contentHeight }}
                >
                    <div ref={contentRef} className={classNameInner}>
                        {children}
                    </div>
                </div>

                <button
                    className={`${className} mt-1 dark:text-white text-gray-900 flex items-center gap-1 rounded-full transition duration-300 ease-in-out transform group`}
                    onClick={toggleExpand}
                >
                    {label}
                    <div className={`${isExpanded ? 'opacity-100 translate-y-0 rotate-180' : 'opacity-100 rotate-0'} group-active:translate-y-3 duration-300 ease-in-out text-xl`}>
                        {arrowType || <SlArrowDown />}
                    </div>

                </button>
            </div>
        </>
    )
}
