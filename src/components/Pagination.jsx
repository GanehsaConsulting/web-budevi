export const Pagination = ({ onLoadMore }) => {
    return (
        <section className="w-full flex items-center justify-center mt-10">
            <button
                onClick={onLoadMore}
                className="dark:bg-bgLight bg-darkColor text-white font-medium rounded-full dark:text-black px-4 py-2  hover:scale-95 text-sm duration-300"
            >
                Tampilkan Lebih
            </button>
        </section>
    );
};
