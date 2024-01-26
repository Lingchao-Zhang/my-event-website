"use client"
import { headerLinks } from "@/constants"
import { NavItemsType } from "@/types"
import Link from "next/link"
import { usePathname } from 'next/navigation'
const NavItems = ({userClerkId}: NavItemsType) => {
    const pathname = usePathname()
    return(
        <ul className="flex flex-col items-start gap-5 md:flex-row">
            {
                headerLinks.map((headerLink) => {
                    const isActive = pathname === headerLink.route
                    return(
                        <li 
                            key={headerLink.label} 
                            className={`${isActive ? "text-primary-500" : ""} flex-center p-medium-16 whitespace-nowrap`}
                        >
                            {
                                headerLink.route === "/profile" && userClerkId !== ""
                                ?
                                <Link href={`${headerLink.route}/${userClerkId}`}>{headerLink.label}</Link>
                                :
                                <Link href={headerLink.route}>{headerLink.label}</Link>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NavItems