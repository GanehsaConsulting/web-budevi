"use client"
import { TbBoxMultiple2, TbBoxMultiple3, TbBoxMultiple4, TbBoxMultiple5, TbBoxMultiple6, TbList } from "react-icons/tb";

export const SwitchView = ({ toggle, updateToggle }) => {

    return (
        <>
            <section className="md:block hidden">
                <div className={`relative flex gap-1 bg-mainColorD dark:bg-darkColor rounded-full p-1`}>
                    <button onClick={() => updateToggle(1)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple4 />
                    </button>
                    <button onClick={() => updateToggle(2)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple5 />
                    </button>
                    <button onClick={() => updateToggle(3)} className="z-50 text-md w-8 h-8 flex items-center justify-center rounded-full">
                        <TbBoxMultiple6 />
                    </button>
                    <div className={`absolute left-[2px] top-[6px] w-[28px] h-[28px]  transition-all duration-500 rounded-full ${toggle === 1 ? "translate-x-1 bg-secondaryColor" : "translate-x-[144%] bg-secondaryColor"} ${toggle === 3 && "translate-x-[270%] bg-secondaryColor"}`}></div>
                </div>
            </section>
        </>
    )
}
