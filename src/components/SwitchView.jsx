"use client"

import { useState } from "react";
import { TbBoxMultiple2, TbBoxMultiple4, TbList } from "react-icons/tb";

export const SwitchView = ({ toggle, updateToggle, isScrolled }) => {

    return (
        <>
            <section className="md:block hidden">
                <div className={`${isScrolled && "bg-opacity-50 bg-white dark:bg-black dark:border-neutral-700 dark:bg-opacity-50 border border-neutral-300"} relative flex gap-1 bg-bgLight dark:bg-darkColor rounded-full p-1`}>
                    <button onClick={() => updateToggle(1)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple4 />
                    </button>
                    <button onClick={() => updateToggle(2)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple2 />
                    </button>
                    <div className={`absolute left-[2px] top-[6px] w-[28px] h-[28px]  transition-all duration-500 rounded-full ${toggle === 1 ? "translate-x-1 bg-white dark:bg-black" : "translate-x-[144%] bg-white dark:bg-black"} ${isScrolled && "bg-opacity-50 bg-white dark:bg-black dark:border-neutral-700 dark:bg-opacity-50 border border-neutral-300"}`}></div>
                </div>
            </section>
            <section className="md:hidden block">
                <div className={`${isScrolled && "bg-opacity-50 bg-white dark:bg-black dark:border-neutral-700 dark:bg-opacity-50 border border-neutral-300"} relative flex gap-[3px] bg-bgLight dark:bg-darkColor rounded-full p-1`}>
                    <button onClick={() => updateToggle(1)} className="z-50 text-md w-6  h-6 flex items-center justify-center rounded-full">
                        <TbBoxMultiple2 />
                    </button>
                    <button onClick={() => updateToggle(2)} className="z-50 text-md w-6  h-6 flex items-center justify-center rounded-full">
                        <TbList />
                    </button>
                    <div className={`absolute left-[0.1px] top-[3.3px] w-[25px] h-[25px]  transition-all duration-500 rounded-full ${toggle === 1 ? "translate-x-1 bg-white dark:bg-black" : "translate-x-[124%] bg-white dark:bg-black"} ${isScrolled && "bg-opacity-50 bg-white dark:bg-black dark:border-neutral-700 dark:bg-opacity-50 border border-neutral-300"}`}></div>
                </div>
            </section>
        </>
    )
}
