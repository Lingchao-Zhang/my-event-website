"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { deleteEvent } from "@/lib/database/actions/event.action"
import { DeleteConfirmationType } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
const DeleteConfirmation = ({objectId}: DeleteConfirmationType) => {
        const router = useRouter()
        return(
            <AlertDialog>
                <AlertDialogTrigger>
                    <Image
                        src="/assets/icons/delete.svg"
                        alt="delete icon"
                        width={24}
                        height={24}
                    />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete this event?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        await deleteEvent(objectId) 
                        alert("You have successfully deleted the event!")
                        router.push("/", {scroll: false})
                        }}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
}

export default DeleteConfirmation