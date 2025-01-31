"use client"

import { useState, useEffect } from 'react';
import { RiWhatsappFill } from 'react-icons/ri';

export const FloatingButton = () => {
    const WaLink = "https://api.whatsapp.com/send?phone=628887127000&text=Halo%20Ganesha%20Consulting";
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 200;
            if (window.scrollY > scrollThreshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Fungsi pelacakan konversi Google Ads
    const gtag_report_conversion = (url) => {
        const callback = () => {
            if (typeof url === 'string') {
                window.location = url;
            }
        };
        window.gtag('event', 'conversion', {
            'send_to': 'AW-16462531026/BMEZCLa_z9QZENKT-ak9',
            'event_callback': callback,
            'event_timeout': 2000,
        });
        return false;
    };

    return (
        <>
            <div className="hidden md:block fixed bottom-5 right-5 z-[100]">
                <section className="flex flex-col gap-3 duration-300">
                    <button
                        onClick={scrollToTop}
                        className={`${isVisible ? "scale-100 " : 'scale-0 '} bg-baseColor bg-opacity-50 duration-300 backdrop-blur-md hover:bg-mainColor hover:text-baseColor dark:text-white text-mainColor rounded-full p-3 shadow-lg`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => gtag_report_conversion(WaLink)}
                        className="bg-[#4DED69] hover:bg-[#35a549] hover:scale-95 duration-300 ease-in-out text-white font-bold py-3 px-3 rounded-full shadow-lg"
                    >
                        <RiWhatsappFill size={25} />
                    </button>
                </section>
            </div>
        </>
    );
};