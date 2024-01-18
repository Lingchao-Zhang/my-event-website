import EventForm from "@/components/forms/EventForm"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const EventCreation = async () => {
    const user = await currentUser()
    if(!user){
      return null
    } else {
      const userInfo = await fetchUserById(user.id)
      if(!userInfo?.onboarded){
        redirect("/onboarding")
      } else{
        return(
          <EventForm 
            currentUserObjectId={userInfo._id} 
            type="create" 
          />
        )
      }
}
}

export default EventCreation