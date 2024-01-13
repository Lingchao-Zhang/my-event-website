import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const onBoarding = async () => {
    const user = await currentUser()
    if(!user){
        return null
    } else {
        const userInfo = await fetchUserById(user.id)
        if(userInfo?.onboarded){
            redirect("/")
        } else {
            const userData = {
                clerkId: userInfo?.clerkId || user.id,
                username: userInfo?.username || user?.username,
                firstname: userInfo?.firstname || user?.firstName,
                lastname: userInfo?.lastname || user?.lastName,
                avatar: userInfo?.avatar || user?.imageUrl
            }

            return(
                <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
                    <h1 className="head-text">Onboarding</h1>
                    <p className="text-light-2 mt-3 text-base-regular">Please fill the following fields to complete your profile setup.</p>
                    <section className="mt-9 bg-dark-2 p-10">
                        <AccountProfile user={userData}                                  
                        />
                    </section>
                </main>
            )
        }
    }
}

export default onBoarding