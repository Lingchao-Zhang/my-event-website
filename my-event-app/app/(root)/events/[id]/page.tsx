import EventDetail from "@/components/shared/EventDetail"
import { fetchEventDetailById } from "@/lib/database/actions/event.action"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { paramsType } from "@/types"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const EventDetailPage = async ({params}: {params: paramsType}) => {
  const user = await currentUser()
  if(!user){
    return null
  } else {
    const userInfo = await fetchUserById(user.id)
    if(!userInfo?.onboarded){
      redirect("/onboarding")
    } else{
        const eventId = params.id
        const eventData = await fetchEventDetailById(eventId)

        return(
            <EventDetail 
              currentUserId={userInfo.clerkId} 
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
        )
    }
 }
}

export default EventDetailPage