export const Pagination = ({ onLoadMore }) => {
    return (
        <button
            onClick={onLoadMore}
            className="bg-mainColorD dark:bg-darkColor rounded-full text-secondaryColor px-3 py-[10px] text-sm duration-300 font-bold"
        >
            +8
        </button>
    );
};
