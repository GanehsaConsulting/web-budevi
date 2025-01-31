import { dataContact } from "../../public/System"
import { Tag } from "./Tag"

export const Address = () => {
    return (
        <>
            <section className="md:mx-10 mx-5 mt-10">
                <Tag text1={'Alamat'} text2={'kami'} />
                <div className="flex flex-col lg:flex-row gap-3 justify-center">
                    <div className="space-y-5">
                        {dataContact.address.map((el, idx) => (
                            <a
                                key={idx}
                                href={el.link}
                                className="w-fit h-[20lvh] p-5 flex flex-col items-start grow justify-between dark:bg-darkColor bg-mainColorD rounded-2xl"
                            >
                                <div className="flex items-center tracking-wide text-xs font-medium uppercase px-2 py-[2px] bg-secondaryColor bg-opacity-70 rounded-full gap-2 w-fit">
                                    {el.icon}
                                    {el.label}
                                </div>
                                <div className="font-medium">
                                    {el.data}
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="mapouter rounded-3xl overflow-hidden grow h-[50lvh] md:h-auto w-full">
                        <div className="overflow-hidden rounded-box h-full">
                            <iframe
                                className="w-full h-full dark:invert dark:contrast-75"
                                src={dataContact.address[0].embed}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}