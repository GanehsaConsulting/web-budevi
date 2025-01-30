import { products } from "../../public/DB";
import { NavbarItems } from "../../public/System"
import { ExpandableButton } from "./ExpandableButton"

export const MobileDrawer = ({ isExpanded }) => {
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

    // Function to get the number of items in a category
    const getCategoryItemCount = (category) => {
        return data.filter((item) => item.category === category).length;
    };
    return (
        <section className="mx-5 min-h-screen space-y-3">
            <section className="space-y-5">
                {NavbarItems.slice(0, 1).map((el, idx) => (
                    <div key={idx} className="z-[888] text-2xl font-medium">
                        <a
                            href={el.href}
                        >
                            {el.label}
                        </a>
                    </div>
                ))}
                <ExpandableButton
                    contentH={'0px'}
                    label={'Produk'}
                    order={'order-last'}
                    className={'text-2xl font-medium justify-between'}
                    classNameInner={'pb-10 translate-y-4 h-full'}
                >
                    <div className="flex flex-col gap-5">
                        {groupedColumns.map(([letter, categories]) => (
                            <div key={letter} className="flex  gap-4">

                                {/* Letter Heading */}
                                <p
                                    className={`${isExpanded ? `translate-y-0 opacity-100` : `-translate-y-10 opacity-0`} duration-300 ease-in-out text-sm font-semibold uppercase min-w-[20px]`}
                                    style={{ transitionDelay: `${letter.charCodeAt(0) * 10}ms` }}
                                >
                                    {letter}
                                </p>
                                {/* List of Categories */}
                                <div className="space-y-1">
                                    {categories.map((cat, idx) => (
                                        <a
                                            key={cat}
                                            className={`${isExpanded ? `translate-y-0 opacity-100` : `-translate-y-10 opacity-0`} ease-in-out text-sm hover:scale-105 duration-300 origin-left w-fit hover:font-medium flex items-center gap-2`}
                                            style={{ transitionDelay: `${idx * 20}ms` }}
                                            href={"/search" + "/" + cat.toLowerCase()}
                                        >
                                            {cat}
                                            <span className="opacity-50 text-xs">
                                                ({getCategoryItemCount(cat)} items)
                                            </span>
                                        </a>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>

                </ExpandableButton>
                {NavbarItems.slice(2, 4).map((el, idx) => (
                    <div key={idx} className="z-[888] text-2xl font-medium">
                        <a
                            href={el.href}
                        >
                            {el.label}
                        </a>
                    </div>
                ))}
            </section>
        </section>
    )
}