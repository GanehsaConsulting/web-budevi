import { dataContact } from "../../public/System"

export const ContactList = () => {
    return (
        <>
            <section className="md:mx-10 mx-5">
                <div className="flex flex-wrap gap-3">
                    {[...dataContact.mail, ...dataContact.phone, ...dataContact.media].map((el, idx) => (
                        <a
                            key={idx}
                            href=""
                            className="w-fit h-[15lvh] p-5 flex flex-col items-start grow justify-between dark:bg-darkColor bg-mainColorD rounded-2xl"
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
            </section>
        </>
    )
}