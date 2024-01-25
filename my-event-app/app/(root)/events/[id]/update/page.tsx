import EventForm from "@/components/forms/EventForm"
import { fetchEventDetailById } from "@/lib/database/actions/event.action"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { paramsType } from "@/types"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const EventUpdate = async ({params}: {params: paramsType}) => {
    const user = await currentUser()
    if(!user){
      return null
    } else {
      const userInfo = await fetchUserById(user.id)
      if(!userInfo?.onboarded){
        redirect("/onboarding")
      } else{
        const eventObjectId = params.id
        const event = await fetchEventDetailById(eventObjectId)
        return(
          <EventForm 
            currentUserObjectId={userInfo._id} 
            type="update" 
            originalEvent={JSON.parse(JSON.stringify(event))}
          />
        )
      }
}
}

export default EventUpdate