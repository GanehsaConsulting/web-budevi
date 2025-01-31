export const Tag = ({ text1, text2 }) => {
    return (
        <>
            <h1 className="mb-5 text-xl font-light text-secondaryColor tracking-wider uppercase">
                <span className="font-bold text-black dark:text-white">
                    {text1} {" "}
                </span>
                {text2}
            </h1>
        </>
    )
}