import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export const Sort = ({ onSort, activeSort }) => {
    const sortItem = [
        {
            label: "A - Z",
            command: "az"
        },
        {
            label: "Z - A",
            command: "za"
        },
        {
            label: "Termurah",
            command: "cheapest"
        },
        {
            label: "Termahal",
            command: "expensive"
        },
        // {
        //     label: "Default",
        //     command: 0
        // },
    ];

    return (
        <>
            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="md:h-[40px] h-[32px] w-fit px-2 md:w-[100px] flex gap-1 items-center justify-center border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-900 duration-300 rounded-full m-1 bg-mainColorD dark:bg-darkColor text-neutral-800 dark:text-neutral-400 text-sm">
                    <HiAdjustmentsHorizontal />
                    Urutkan
                </div>
                <ul tabIndex={0} className="dropdown-content menu dark:bg-darkColor bg-mainColorD rounded-box z-[1] w-52 p-2 shadow">
                    {sortItem.map((item, idx) => (
                        <li key={idx}>
                            <button
                                onClick={() => onSort(item.command)}
                                className={`w-full text-left px-2 py-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 ${activeSort === item.command ? 'bg-secondaryColor' : ''}`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
