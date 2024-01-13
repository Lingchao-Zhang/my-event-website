import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
    return(
        <header className="w-ful border-b">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="w-36">
                    <Image 
                     src="/assets/images/logo.svg"
                     width={128}
                     height={38}
                     alt="evently logo"
                    />
                </Link>
                <SignedIn>
                    <nav className="hidden md:flex-between w-full max-w-xs">
                        <NavItems />
                    </nav>
                </SignedIn>
                <div className="flex w-32 justify-end gap-3">
                   <SignedIn>
                     <UserButton afterSignOutUrl="/sign-in"/>
                     <MobileNav />
                   </SignedIn>
                   <SignedOut>
                     <button className="rounded-full">
                        <Link href="/sign-in">
                            Login
                        </Link>
                     </button>
                   </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header 
