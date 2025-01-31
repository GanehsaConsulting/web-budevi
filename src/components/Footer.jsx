import { PiFlowerLotusLight } from "react-icons/pi"
import { dataContact, NavbarItems } from "../../public/System"

export const Footer = () => {
    return (
        <>
            <footer className="md:p-10 grid grid-cols-3">
                <nav>
                    <p className="footer-title text-xs">
                        Kontak
                    </p>
                    <div className="flex flex-col gap-2">
                        {[...dataContact.phone, ...dataContact.mail,].map((el, idx) => (
                            <a
                                key={idx}
                                className="duration-300 hover:font-bold"
                                href={el.link}
                            >
                                {el.data}
                            </a>
                        ))}
                    </div>
                </nav>
                <nav className="space-y-5">
                    <div className="text-mainColor dark:text-mainColorD flex flex-col items-center gap-2 text-2xl md:text-4xl font-light opacity-80 brightness-105">
                        <PiFlowerLotusLight />
                        <h1>
                            Sinar {' '}
                            <span className="text-secondaryColor">
                                Lotus
                            </span>
                        </h1>
                    </div>
                    <div className="flex gap-5 justify-center items-center">
                        {NavbarItems.map((el, idx) => (
                            <a
                                className="text-xs font-light tracking-wider uppercase duration-300 hover:font-semibold "
                                key={idx}
                                href={el.href}
                            >
                                {el.label}
                            </a>
                        ))}
                    </div>
                </nav>
                <nav className="text-right">
                    <p className="footer-title text-xs">
                        Social Media
                    </p>
                    <div className="flex flex-col gap-2">
                        {[...dataContact.media].map((el, idx) => (
                            <a
                                key={idx}
                                className="duration-300 hover:font-bold"
                                href={el.link}
                            >
                                {el.label}
                            </a>
                        ))}
                    </div>
                </nav>
            </footer>
            <footer className="footer footer-center text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Sinar Lotus</p>
                </aside>
            </footer>
        </>
    )
}