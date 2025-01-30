"use client"
import { TbBoxMultiple2, TbBoxMultiple4, TbBoxMultiple6, TbList } from "react-icons/tb";

export const SwitchView = ({ toggle, updateToggle }) => {

    return (
        <>
            <section className="md:block hidden">
                <div className={`relative flex gap-1 bg-bgLight dark:bg-darkColor rounded-full p-1`}>
                    <button onClick={() => updateToggle(1)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple4 />
                    </button>
                    <button onClick={() => updateToggle(2)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple2 />
                    </button>
                    <button onClick={() => updateToggle(3)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple6 />
                    </button>
                    <div className={`absolute left-[2px] top-[6px] w-[28px] h-[28px]  transition-all duration-500 rounded-full ${toggle === 1 ? "translate-x-1 bg-white dark:bg-black" : "translate-x-[144%] bg-white dark:bg-black"} ${toggle === 3 && "translate-x-[270%] bg-white dark:bg-black"}`}></div>
                </div>
            </section>
        </>
    )
}
