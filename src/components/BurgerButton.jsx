export default function BurgerButton({ isExpanded }) {
    return (
        <button
            className={`${isExpanded ? "scale-110" : ""} z-10 duration-300 relative w-[17px] h-[10px] flex flex-col justify-center items-center group`}
        >
            <div className={`w-full h-[2.1px] rounded-full bg-neutral-500 dark:bg-neutral-200 transition-all duration-300 ease-in-out
                        ${isExpanded ? 'translate-y-[1px] rotate-45' : '-translate-y-[100%]'}`}></div>

            <div className={`w-full h-[2.1px] rounded-full bg-neutral-500 dark:bg-neutral-200 transition-all duration-300 ease-in-out
                        ${isExpanded ? '-translate-y-[1px] -rotate-45' : 'translate-y-[100%]'}`}></div>
        </button>
    );
}
