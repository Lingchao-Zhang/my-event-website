"use client"
import { CheckoutButtonType } from "@/types"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
import Checkout from "./Checkout"

const CheckoutButton = ({
    eventObjectId,
    eventTitle,
    endTime,
    isFree,
    price
}: CheckoutButtonType) => {
    const {user} = useUser()
    const userId = user?.publicMetadata.userId as string
    const hasEventClosed = new Date(endTime) < new Date()
    return(
        <div>
            {
                hasEventClosed 
                ? 
                <p className="p-regular-20">Sorry, this event was closed!</p>
                :
                (
                    <>
                        <SignedOut>
                            <Button asChild className="button">
                                <Link href="/sign-in">
                                    Get Tickets
                                </Link>
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <Checkout 
                                eventObjectId={eventObjectId} 
                                eventTitle={eventTitle}
                                isFree={isFree} 
                                price={price} 
                                customerId={userId} 
                            />
                        </SignedIn>
                    </>
                )
            }
        </div>
    )
}

export default CheckoutButton