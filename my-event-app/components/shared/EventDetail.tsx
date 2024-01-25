import { EventDetailType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { formatDateTime, formatPrice } from "@/lib/utils"

const EventDetail = ({
    title,
    category,
    description,
    imageUrl,
    location,
    startTime,
    endTime,
    price,
    isFree,
    eventUrl,
    organizer,
    createdAt
}: EventDetailType) => {
    const startTimeDate = formatDateTime(startTime).dateOnly
    const endTimeDate = formatDateTime(endTime).dateOnly
    return(
        <section className="flex flex-col m-5 md:flex-row">
            <div className="w-full mb-10 md:mr-10">
                <Image 
                    src={imageUrl}
                    alt="event poster"
                    width={1000}
                    height={1000}
                    className="min-w-[500px] min-h-[300px] object-cover object-center"
                />
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="h1-bold">{title}</h1>
                <div className="flex gap-5">
                    <div className="rounded-full w-fit h-wit p-medium-16 bg-green-300 text-center px-4 py-1">{isFree ? "Free" : formatPrice(price)}</div>
                    <div className="rounded-full w-fit h-wit p-medium-16 bg-gray-200 text-center px-4 py-1">{category}</div>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="p-bold-24">by</p>
                    <Link className="p-regular-24" href={`/profile/${organizer.clerkId}`}>{organizer.username}</Link>
                    <p className="p-regular-20">created At {`${formatDateTime(createdAt).dateTime}`}</p>
                </div>
                <Button className="button w-64">{isFree ? "Book" : "Buy"} a ticket</Button>
                <div className="flex gap-2 mt-5">
                    <Image 
                      src="/assets/icons/calendar.svg"
                      alt="calendar icon"
                      width={24}
                      height={24}
                    />
                    <p className="p-regular-20">
                        {
                            startTimeDate === endTimeDate ?
                            `${formatDateTime(startTime).dateOnly} / ${formatDateTime(startTime).timeOnly} - ${formatDateTime(endTime).timeOnly}` 
                            :
                            `${formatDateTime(startTime).dateTime} - ${formatDateTime(endTime).dateTime}`
                        }
                    </p>
                </div>
                <div className="flex gap-2">
                    <Image 
                      src="/assets/icons/location.svg"
                      alt="location icon"
                      width={24}
                      height={24}
                    />
                    <p className="p-regular-20">{location}</p>
                </div>
                <div className="flex gap-2">
                    <Image 
                      src="/assets/icons/link.svg"
                      alt="link icon"
                      width={24}
                      height={24}
                    />
                    <Link href={eventUrl} className="p-regular-20"><span className="p-medium-20">Event Url:</span> {eventUrl}</Link>
                </div>
                <h3 className="h3-bold mt-10">About this event:</h3>
                <p className="p-regular-20">{description}</p>
            </div>
        </section>
    )
}

export default EventDetail