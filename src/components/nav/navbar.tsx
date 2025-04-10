"use client";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";


function Navbar() {
    const router = useRouter();

    const routes: {key: string, label: string, href: string}[] = [
        {
            key: "analises",
            label: "análises",
            href: "/analises",
        },
        {
            key: "mels",
            label: "mels",
            href: "/mels",
        },
        {
            key: "sair",
            label: "sair",
            href: "/",
        }
    ];

    const onclik = (item: any) => {
        const route: {key: string, label: string, href: string}[] = routes.filter((r) => { return r.key === item.key });

        if (route[0].key === "sair") {
            signOut()
        }else {
            router.push(`${route[0].href}`)
        }

    }

    return (
        <header className="px-3 border-b-2">
            <nav  className="flex justify-between items-center p-6">
                    <div className="text-2xl">projmel</div>
                    <Menu
                        mode="horizontal"
                        items={routes}
                        style={{ flex: 1, minWidth: 0, justifyContent: "end", fontSize: 24, borderBottom: "0px" }}
                        onClick={(e: any) => {onclik(e)}}
                    />
            </nav>
        </header>
    )
}

export default Navbar;