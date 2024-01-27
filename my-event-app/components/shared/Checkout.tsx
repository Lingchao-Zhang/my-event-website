"use client"
import { CheckoutType } from "@/types"
import { Button } from "../ui/button"
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Input } from "../ui/input";
import { checkoutOrder } from "@/lib/database/actions/order.action";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
    eventObjectId,
    eventTitle,
    isFree,
    price,
    customerId,
}: CheckoutType) => {
    const [ticketNumber, setTicketNumber] = useState("1")
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    
    const onCheckout = async () => {
        const orderInfo = {
            eventTitle,
            isFree, 
            ticketAmount: Number(ticketNumber),
            price, 
            eventObjId: eventObjectId,
            customerId
        }

        await checkoutOrder(orderInfo)
    }
    return(
        <AlertDialog>
                <AlertDialogTrigger>
                    <Button className="button">
                        {
                            isFree ?
                            "Get Tickets"
                            :
                            "Buy Tickets"
                        }
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                    <AlertDialogTitle>How many tickets you want to purchase?</AlertDialogTitle>
                    <AlertDialogDescription>
                           <Input placeholder="Ticket Number" className="input-field mt-3" onChange={(e) => setTicketNumber(e.target.value)}/>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onCheckout}>Buy</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )
}

export default Checkout