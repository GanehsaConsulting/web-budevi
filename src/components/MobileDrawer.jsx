import { NavbarItems } from "../../public/System"

export const MobileDrawer = () => {
    return (
        <section className="mx-5 min-h-screen space-y-3">
            <section className="space-y-5">
                {NavbarItems.map((el, idx) => (
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