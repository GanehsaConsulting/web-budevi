import { TbMail, TbMailFilled } from "react-icons/tb";
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinFill, RiWhatsappFill } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";


export const NavbarItems = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Tentang Kami",
        href: "/about-us"
    },
    {
        label: "Kontak",
        href: "/contact"
    },
]

export const brandIdentity = {
    banner: {
        imageURL: "https://source.unsplash.com/random/1920x600?ecommerce",
        taglineShort: "Quality Delivered with Care",
        taglineLong: "Discover a world of handpicked products, each crafted for excellence, at prices designed for every budget.",
        description: "Explore a curated collection of products that promise excellence, backed by reliable shipping and secure payment gateways. Your trust is our commitment, and we strive to exceed your expectations with every purchase."
    },
    aboutUs: {
        title: "Tentang Kami",
        description: "Selamat datang di [Nama Brand Anda], toko online terpercaya Anda yang mengutamakan kualitas dan kenyamanan. Kami mulai dengan ide sederhana: memberikan akses mudah bagi pelanggan untuk mendapatkan produk berkualitas dengan harga terjangkau. Koleksi kami mencakup berbagai kategori, dari elektronik hingga fashion, serta produk rumah tangga hingga kecantikan. Dengan platform yang mudah digunakan, sistem pembayaran yang aman, dan pelayanan pelanggan yang luar biasa, kami berkomitmen untuk membuat pengalaman belanja online Anda semudah mungkin."
    },
    visiMisi: {
        visi: "Menjadi platform belanja online yang paling terpercaya dan pilihan utama, memberikan pelanggan kami berbagai produk premium, pelayanan yang luar biasa, dan harga yang tak terkalahkan.",
        misi: [
            "Menawarkan produk berkualitas tinggi yang dapat diandalkan dalam berbagai kategori.",
            "Menyediakan solusi pengiriman yang cepat, aman, dan terjangkau.",
            "Menjamin pengalaman belanja yang mulus dan bebas hambatan bagi semua pelanggan.",
            "Terus berinovasi dan meningkatkan platform serta layanan kami."
        ]
    },
    whyUs: {
        title: "Mengapa Memilih Kami",
        description: [
            "Kami berkomitmen untuk memberikan Anda pengalaman belanja yang personal.",
            "Pilihan Luas: Berbagai produk berkualitas untuk memenuhi setiap kebutuhan Anda.",
            "Belanja Aman: Privasi dan keamanan Anda adalah prioritas kami dengan opsi pembayaran yang terenkripsi.",
            "Harga Terjangkau: Harga yang kompetitif dengan berbagai penawaran dan promo.",
            "Pengiriman Cepat: Kami pastikan produk Anda sampai dengan cepat dan aman, dimana pun Anda berada."
        ]
    },
    ourServices: {
        title: "Layanan Kami",
        description: [
            "Di [Nama Brand Anda], kami menawarkan berbagai layanan yang dirancang untuk meningkatkan pengalaman belanja Anda.",
            "Pengiriman Gratis: Untuk pembelian di atas jumlah tertentu, nikmati pengiriman gratis ke pintu rumah Anda.",
            "Layanan Pelanggan 24/7: Tim dukungan kami selalu siap membantu Anda dengan pertanyaan apapun.",
            "Retur & Tukar Barang Mudah: Kami menawarkan kebijakan retur tanpa ribet untuk produk yang tidak memuaskan.",
            "Pilihan Pembayaran Aman: Berbagai metode pembayaran termasuk kartu kredit/debit, transfer bank, dan e-wallet."
        ]
    },
    contact: {
        title: "Hubungi Kami",
        description: [
            "Ada pertanyaan atau butuh bantuan? Kami siap membantu Anda melalui cara berikut:",
            "Email: support@yourbrand.com",
            "Telepon: +62 812 3456 7890",
            "Alamat: Jl. Contoh No. 123, Jakarta, Indonesia",
            "Media Sosial: Ikuti kami di Instagram, Facebook, dan Twitter untuk pembaruan produk dan promo terbaru!"
        ]
    }
};

export const dataContact = {
    mail: [
        {
            label: "Email",
            icon: <TbMailFilled />,
            data: "ganeshamultikreatif@gmail.com",
            link: "mailto:ganeshamultikreatif@gmail.com"
        },
        {
            label: "Email",
            icon: <TbMail />,
            data: "commercial@ganeshaconsulting.co.id",
            link: "mailto:commercial@ganeshaconsulting.co.id"
        }
    ],
    phone: [
        {
            label: "Phone",
            icon: <IoIosCall />,
            data: "+62 888 712 7000",
            link: "tel:628887127000"
        }
    ],
    media: [
        {
            label: "Instagram",
            icon: <RiInstagramFill />,
            data: "@ganeshamultikreatif",
            link: "https://www.instagram.com/ganeshamultikreatif?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        },
        {
            label: "Facebook",
            icon: <RiFacebookBoxFill />,
            class: "bg-gradient-to-b to-transparent from-[#EA5554] !text-white",
            data: "Ganesha Consulting",
            link: "https://www.facebook.com/profile.php?id=61555739807086"
        },
        {
            label: "LinkedIn",
            icon: <RiLinkedinFill />,
            data: "Ganesha Multi Kreatif",
            link: "https://www.linkedin.com/company/ganesha-multi-kreatif/"
        },
        {
            label: "WhatsApp",
            icon: <RiWhatsappFill />,
            data: "+62 888 712 7000",
            link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo%20Ganesha%20Consulting"
        }
    ],
    address: [
        {
            label: "Operational Office",
            data: "Jl. Raya Masjid Al Hidayah No.5, RT.6/RW.7, Pejaten Barat, Pasar Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12510",
            embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126905.92489499568!2d106.7575353514891!3d-6.288666897638287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3007a6e8e39%3A0xf83b477d03a6931f!2sGANESHA%20CONSULTING%20-%20OPERATIONAL!5e0!3m2!1sid!2sid!4v1723453298072!5m2!1sid!2sid",
            link: "https://maps.app.goo.gl/jvz8ScJZtUmAnT7SA"
        },
        {
            label: "Head Office",
            data: "Menara Cakrawala 12th Floor Unit 5A, Jalan M.H. Thamrin, Desa/Kelurahan Kebon Sirih, Kec. Menteng, Kota Adm. Jakarta Pusat, Provinsi DKI Jakarta 10340",
            embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.586712234682!2d106.82116857499005!3d-6.1860248938015285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f428abe15763%3A0x7c3a05b23a1bfef!2sMenara%20Cakrawala!5e0!3m2!1sid!2sid!4v1723453764481!5m2!1sid!2sid",
            link: "https://maps.app.goo.gl/8wg4sGKQiffsFRML8"
        }
    ]
};