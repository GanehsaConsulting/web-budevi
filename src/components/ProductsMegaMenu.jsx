import { products } from "../../public/DB";

export const ProductsMegaMenu = ({ isExpanded }) => {
    const data = products;

    // Extract unique categories
    const uniqueCategories = [];
    data.forEach((el) => {
        if (!uniqueCategories.includes(el.category)) {
            uniqueCategories.push(el.category);
        }
    });

    // Sort categories alphabetically
    uniqueCategories.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Group categories by their first letter
    const groupedCategories = {};
    uniqueCategories.forEach((cat) => {
        const firstLetter = cat[0].toUpperCase();
        if (!groupedCategories[firstLetter]) {
            groupedCategories[firstLetter] = [];
        }
        groupedCategories[firstLetter].push(cat);
    });

    // Convert grouped categories into columns
    const groupedColumns = Object.entries(groupedCategories);

    return (
        <>
            <div className="space-y-4">
                <p className="text-xs uppercase font-medium opacity-50">
                    Kategori Produk
                </p>
                <div className="grid grid-cols-5 gap-10">
                    {groupedColumns.map(([letter, categories]) => (
                        <div
                            key={letter}
                            className="space-y-[2px]">
                            <p
                                className={`${isExpanded ? `-translate-y-0 opacity-100` : `-translate-y-10 opacity-0`} mb-3 duration-300 ease-in-out text-sm font-semibold uppercase`}
                                style={{ transitionDelay: `${letter * 20}ms` }}>
                                {letter}
                            </p>
                            {categories.map((cat, idx) => (
                                <a
                                    key={cat}
                                    className={`${isExpanded ? `-translate-y-0 opacity-100` : `-translate-y-10 opacity-0`} ease-in-out block text-sm hover:scale-105 duration-300 origin-left w-fit hover:font-medium`}
                                    style={{ transitionDelay: `${idx * 20}ms` }}
                                    href={"/product" + "/" + cat.toLowerCase()}
                                >
                                    {cat}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
