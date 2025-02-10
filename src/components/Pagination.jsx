export const Pagination = ({ onLoadMore }) => {
    return (
        <button
            onClick={onLoadMore}
            className=" bg-mainColorD dark:bg-darkColor brightness-90 dark:brightness-125 dark:text-white rounded-r-full text-black pl-2 pr-3 py-2 text-sm duration-300 font-bold"
        >
            +8
        </button>
    );
};
