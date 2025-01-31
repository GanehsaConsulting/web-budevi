import { Address } from "@/components/Address";
import { Banner } from "@/components/Banner";
import { ContactList } from "@/components/ContactList";

export default function Contact() {
    return (
        <>
            <Banner
                head={<>Hubungi Kami!</>}
                imgUrl={'https://images.unsplash.com/photo-1703669020883-66f3e77ae929?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            />
            <ContactList />
            <Address />
        </>
    )
}