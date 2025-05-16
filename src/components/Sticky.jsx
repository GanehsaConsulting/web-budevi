export const Sticky = ({ children }) => {
    return (
        <>
            <section className={`z-[99] md:px-10 px-5 md:mb-8 mb-2 flex md:flex-row flex-col md:gap-2 duration-300 sticky bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-xl py-1 md:py-1 top-0`}>
                {children}
            </section>
        </>
    )
}