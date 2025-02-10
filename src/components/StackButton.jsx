"use client";
import { useState } from "react"
import { FaExpandAlt } from "react-icons/fa";;
import { MdPictureAsPdf } from "react-icons/md";

export const StackButton = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <div
                // onClick={() => setIsActive(!isActive)}
                className={`
                    ${isActive ? "stack" : "flex flex-col gap-1"}
                 duration-300 ease-in-out transition-all fixed left-5 bottom-5 z-[99999]`}>
                {/* <button
                    className="bg-mainColor/50 dark:bg-mainColorD/50 backdrop-blur-md hover:scale-95 duration-300 ease-in-out text-white font-bold py-3 px-3 w-fit text-xl rounded-full shadow-lg"
                >
                    <MdPictureAsPdf />
                </button> */}
                {children}
            </div>
        </>
    )
}