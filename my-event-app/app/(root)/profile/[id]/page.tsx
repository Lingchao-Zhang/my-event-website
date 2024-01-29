import EventCard from "@/components/shared/EventCard"
import OrdersDetailTable from "@/components/shared/OrdersDetailTable"
import Pagination from "@/components/shared/Pagination"
import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchEventsByUserId } from "@/lib/database/actions/event.action"
import { fetchOrdersByEventObjId, fetchOrdersByUserId } from "@/lib/database/actions/order.action"
import { fetchUserById } from "@/lib/database/actions/user.action"
import { OrderInterface, ProfileSearchParamsType, profileParamsType } from "@/types"
import { currentUser } from "@clerk/nextjs"

const ProfilePage = async ({params, searchParams}: {params: profileParamsType, searchParams: ProfileSearchParamsType}) => {
    const user = await currentUser()
    const profileUserId = params.id
    const eventPageNumber = Number(searchParams.eventsPageNumber)
    const userOrdersPageNumber = Number(searchParams.userOrdersPageNumber)
    const eventOrdersPageNumber = Number(searchParams.eventOrdersPageNumber)
    const profileUser = await fetchUserById(profileUserId)
    // fetch user events
    const fetchUserEventsParam = {
        currentPageNumber: eventPageNumber ? eventPageNumber : 1,
        pageSize: 1,
        userId: profileUserId
    }
    const events = await fetchEventsByUserId(fetchUserEventsParam)
    const userEvents = events.displayedEvents
    const isNextEvents = events.isNext
    const eventsTotalAmount = events.totalEventsNumber
    const allEvents = events.allEvents
    // fetch user orders
    const fetchUserOrdersParam = {
        customerId: profileUserId,
        currentPageNumber: userOrdersPageNumber ? userOrdersPageNumber : 1,
        pageSize: 1
    }
    const orders = await fetchOrdersByUserId(fetchUserOrdersParam)
    const userOrders = orders.displayedOrders
    const isNextUserOrders = orders.isNext
    const userOrdersTotalAmount = orders.totalOrdersNumber

    const userOrderList = userOrders.map((order) => {
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
    const eventsOrderPageSize = 1
    for(let i = 0; i < allEvents.length; i++){
        const event = allEvents[i]
        // fetch event orders
        const eventOrders = await fetchOrdersByEventObjId(event._id)
        if(eventOrders.length > 0){
            eventOrders.map((order) => {
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
    const isNextEventsOrders = eventOrdersPageNumber ? eventsOrderList.length > eventsOrderPageSize * eventOrdersPageNumber : eventsOrderList.length > eventsOrderPageSize
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
            <div>
                <div className="flex flex-col gap-10">
                    <div className="flex w-full flex-col gap-6 md:flex-row md:flex-wrap">
                        {
                            userEvents.length > 0 ? 
                            userEvents.map((event) => (
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
                    </div>
                    <Pagination 
                        pageIndexName="eventsPageNumber"
                        pageNumber={eventPageNumber ? eventPageNumber : 1} 
                        isNext={isNextEvents} 
                        currentPath={`/profile/${profileUserId}?userOrdersPageNumber=${userOrdersPageNumber ? userOrdersPageNumber : 1}&eventOrdersPageNumber=${eventOrdersPageNumber ? eventOrdersPageNumber : 1}`} 
                        totalPageNumber={eventsTotalAmount / fetchUserEventsParam.pageSize} 
                    />
                </div>
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
                            <Pagination 
                                pageIndexName="userOrdersPageNumber"
                                pageNumber={userOrdersPageNumber ? userOrdersPageNumber : 1} 
                                isNext={isNextUserOrders} 
                                currentPath={`/profile/${profileUserId}?eventsPageNumber=${eventPageNumber ? eventPageNumber : 1}&eventOrdersPageNumber=${eventOrdersPageNumber ? eventOrdersPageNumber : 1}`} 
                                totalPageNumber={userOrdersTotalAmount / fetchUserOrdersParam.pageSize} 
                            />
                        </div>
                        <div>
                            <p className="h3-bold my-5">Orders of my events:</p>
                            <OrdersDetailTable 
                                type="Orders of event" 
                                orders={eventOrdersPageNumber ? eventsOrderList.slice(eventOrdersPageNumber - 1, eventOrdersPageNumber) : eventsOrderList.slice(0, eventsOrderPageSize)}
                            />
                            <Pagination 
                                pageIndexName="eventOrdersPageNumber"
                                pageNumber={eventOrdersPageNumber ? eventOrdersPageNumber : 1} 
                                isNext={isNextEventsOrders} 
                                currentPath={`/profile/${profileUserId}?eventsPageNumber=${eventPageNumber ? eventPageNumber : 1}&userOrdersPageNumber=${userOrdersPageNumber ? userOrdersPageNumber : 1}`} 
                                totalPageNumber={eventsOrderList.length / eventsOrderPageSize} 
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