import { ProfileHeaderType } from "@/types"
import Image from "next/image"

const ProfileHeader = ({userProfile}: ProfileHeaderType) => {
    return(
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 object-cover">
                        <Image 
                         src={userProfile.avatar}
                         alt="Profile Image"
                         fill
                         className="rounded-full object-cover shadow-2xl"
                         />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-left h3-bold">
                            {userProfile.firstname} {userProfile.lastname}
                        </h2>
                        <p className="p-medium-20 text-gray-1">@{userProfile.username}</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 h-0.5 w-full" />
        </div>
    )
}

export default ProfileHeader