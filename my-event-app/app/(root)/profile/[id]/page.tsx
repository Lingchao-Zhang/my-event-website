import EventCard from "@/components/shared/EventCard"
import OrdersDetailTable from "@/components/shared/OrdersDetailTable"
import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchOrdersByEventObjId, fetchOrdersByUserId } from "@/lib/database/actions/order.action"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { OrderInterface, profileParamsType } from "@/types"
import { currentUser } from "@clerk/nextjs"

const ProfilePage = async ({params}: {params: profileParamsType}) => {
    const user = await currentUser()
    const profileUserId = params.id
    const profileUser = await fetchUserById(profileUserId)
    const fetchUserOrdersParam = {
        customerId: profileUserId,
        currentPageNumber: 1,
        pageSize: 10
    }
    const orders = await fetchOrdersByUserId(fetchUserOrdersParam)
    const displayedOrders = orders.displayedOrders
    const userOrderList = displayedOrders.map((order) => {
        return {
            orderId: order.orderId,
            ticketAmount: order.ticketAmount,
            customer: {
                clerkId: profileUser.clerkId,
                username: profileUser.username
            },
            event: {
                eventObjId: order.event._id,
                title: order.event.title
            },
            createdAt: order.createdAt
        }
    })
    const eventsOrderList: OrderInterface[] = []
    for(let i = 0; i < profileUser.organisedEvents.length; i++){
        const event = profileUser.organisedEvents[i]
        const fetchEventOrdersParam = {
            eventObjId: event._id,
            currentPageNumber: 1,
            pageSize: 10
        }
        const eventOrders = await fetchOrdersByEventObjId(fetchEventOrdersParam)
        const displayedOrders = eventOrders.displayedOrders
        if(displayedOrders.length > 0){
            displayedOrders.map((order) => {
                const eventOrder = {
                    orderId: order.orderId,
                    ticketAmount: order.ticketAmount,
                    customer: {
                        clerkId: order.customer.clerkId,
                        username: order.customer.username
                    },
                    event: {
                        eventObjId: event._id,
                        title: event.title
                    },
                    createdAt: order.createdAt
                } 
                eventsOrderList.push(eventOrder)
            })
        }
    }
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
                            currentUserId={user?.id || ""}
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
                    user?.id === profileUser.clerkId
                    ?
                    <div className="flex flex-col my-10 gap-10">
                        <div>
                            <p className="h3-bold my-5">My Orders:</p>
                            <OrdersDetailTable 
                                type="Orders of user" 
                                orders={userOrderList} 
                            />
                        </div>
                        <div>
                            <p className="h3-bold my-5">Orders of my events:</p>
                            <OrdersDetailTable 
                                type="Orders of event" 
                                orders={eventsOrderList}
                            />
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
 }


export default ProfilePage