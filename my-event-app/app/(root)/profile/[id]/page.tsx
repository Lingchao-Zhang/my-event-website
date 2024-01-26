import EventCard from "@/components/shared/EventCard"
import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { profileParamsType } from "@/types"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const ProfilePage = async ({params}: {params: profileParamsType}) => {
    const user = await currentUser()
    if(!user){
      return null
    } else {
      const userInfo = await fetchUserById(user.id)
      if(!userInfo?.onboarded){
        redirect("/onboarding")
      } else{
        const profileUserId = params.id
        const profileUser = await fetchUserById(profileUserId)
        return(
            <div className="flex flex-col mx-20 my-5">
                <ProfileHeader 
                    userProfile={{
                        clerkId: profileUser.clerkId,
                        username: profileUser.username,
                        firstname: profileUser.firstname,
                        lastname: profileUser.lastname,
                        avatar: profileUser.avatar
                    }} 
                />
                <p className="h3-bold my-5">My Events:</p>
                <div className="flex w-full flex-col gap-6 md:flex-row md:flex-wrap">
                    {
                        profileUser.organisedEvents.length > 0 ? 
                        profileUser.organisedEvents.map((event: any) => (
                            <EventCard 
                                currentUserId={userInfo.clerkId}
                                key={event._id}
                                objectId={event._id} 
                                imageUrl={event.imageUrl} 
                                isFree={event.isFree} 
                                price={event.price} 
                                category={event.category} 
                                startTime={event.startTime} 
                                title={event.title} 
                                organizer={
                                    {
                                        clerkId: profileUser.clerkId,
                                        username: profileUser.username
                                    }
                                }                  
                            />
                        ))
                        :
                        null
                    }
                    {
                        //TODO: display orders only if currentUserId === userProfile.clerkId
                    }
                </div>
            </div>
        )
      }
 }
}

export default ProfilePage