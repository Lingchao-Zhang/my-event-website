import { formatDateTime, formatPrice } from "@/lib/utils"
import { EventCardType } from "@/types"
import Image from "next/image"
import Link from "next/link"

const EventCard = ({
    objectId,
    imageUrl,
    isFree,
    price,
    category,
    startTime,
    title,
    organizer
}: EventCardType) => {
    return(
        <div className="flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            <Link href={`/events/${objectId}`}>
                <Image
                    src={imageUrl}
                    alt="event poster"
                    width={400}
                    height={400}
                    className="w-full h-fit object-contain"
                />
            </Link>
            <div className="flex gap-5 px-5 py-3">
                <div className="rounded-full w-fit h-fit p-medium-16 bg-green-300 text-center px-4 py-1">{isFree ? "Free" : formatPrice(price)}</div>
                <div className="rounded-full w-fit h-fit p-medium-16 bg-gray-200 text-center px-4 py-1">{category}</div>
            </div>
            <p className="p-regular-20 px-5">{formatDateTime(startTime).dateTime}</p>
            <Link href={`/events/${objectId}`} className="p-bold-24 px-5 py-3">{title}</Link>
            <Link className="p-regular-24 p-5" href={`/profile/${organizer.clerkId}`}>{organizer.username}</Link>
        </div>
    )
}

export default EventCard