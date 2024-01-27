import EventDetail from "@/components/shared/EventDetail"
import { fetchEventDetailById, fetchRelatedEvents } from "@/lib/database/actions/event.action"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { paramsType } from "@/types"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import EventCard from "@/components/shared/EventCard"

const EventDetailPage = async ({params}: {params: paramsType}) => {
  const user = await currentUser()
  const eventId = params.id
  const eventData = await fetchEventDetailById(eventId)
  const fetchRelatedEventsParam = {
    originalEventObjectId: eventId, 
    categoryType: eventData.category, 
    organizerId: eventData.createdBy.clerkId
  }
  const relatedEvents = await fetchRelatedEvents(fetchRelatedEventsParam)
  return(
    <div>
      <EventDetail 
        eventObjId={eventId}
        title={eventData.title} 
        category={eventData.category} 
        description={eventData.description} 
        imageUrl={eventData.imageUrl} 
        location={eventData.location} 
        startTime={eventData.startTime} 
        endTime={eventData.endTime} 
        price={eventData.price} 
        isFree={eventData.isFree} 
        eventUrl={eventData.eventUrl} 
        organizer={eventData.createdBy}
        createdAt={eventData.createdAt}            
      />

      <Separator className="border border-gray-50"/>
      <p className="p-bold-24 px-7 pt-5">Other events you may like:</p>
      <div className="flex w-full flex-col gap-6 p-7 md:flex-row md:flex-wrap">
        {
          relatedEvents.length > 0 ?
          relatedEvents.map((event) => (
            <EventCard 
              currentUserId={user?.id || ""}
              key={event._id}
              objectId={event._id} 
              imageUrl={event.imageUrl} 
              isFree={event.isFree} 
              price={event.price} 
              category={event.category} 
              startTime={event.startTime} 
              title={event.title} 
              organizer={event.createdBy}                  
            />
          ))
          :
          <p className="no-result">No threads founded</p>
        }
      </div>
    </div>
  )
}

export default EventDetailPage