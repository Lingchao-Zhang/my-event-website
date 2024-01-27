"use server"
import { CheckoutOrderParamsType, createOrderParamType, getOrdersByEventObjIdParamType, getOrdersByUserIdParamType } from "@/types"
import { connectToDatabase } from ".."
import Order from "../models/order.model"
import Event from "../models/event.model"
import User from "../models/user.model"
import Stripe from "stripe"
import { redirect } from "next/navigation"
const checkoutOrder = async (order: CheckoutOrderParamsType) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
    const price = order.isFree ? 0 : Number(order.price) * 100;
  
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'aud',
              unit_amount: price,
              product_data: {
                name: order.eventTitle
              }
            },
            quantity: order.ticketAmount
          },
        ],
        metadata: {
          eventObjId: JSON.stringify(order.eventObjId),
          customerId: order.customerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${order.customerId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
  
      redirect(session.url!)
    } catch(error: any){
        throw new Error(`Failed to checkout order: ${error.message}`)
    }
  }

const createOrder = async (orderInfo: createOrderParamType) => {
    try{
        await connectToDatabase()
        const user = await User.findOne({clerkId: orderInfo.customer})
        const newOrder = await Order.create({
          ...orderInfo,
          customer: user._id
        })

        return newOrder
    } catch(error: any){
        throw new Error(`Failed to create new order: ${error.message}`)
    }
}

const fetchOrdersByUserId = async ({customerId, currentPageNumber, pageSize}: getOrdersByUserIdParamType) => {
    try{
        await connectToDatabase()
        // calculate skipped events according to currentPageNumber and pageSize
        const skippedAmount = (currentPageNumber - 1) * pageSize
        const orders = Order.find({customer: customerId})
                            .skip(skippedAmount)
                            .limit(10)
                            .sort({ createdAt: "desc"})
                            .populate(
                                {
                                    path: "event",
                                    model: Event,
                                    select: "_id title"
                                }
                            )

        const totalOrdersNumber = await Order.countDocuments({customer: customerId})
        const displayedOrders = await orders.exec()
        const isNext = totalOrdersNumber > displayedOrders.length + skippedAmount

        return {displayedOrders, isNext}
    } catch(error: any){
        throw new Error(`Failed to get orders: ${error.message}`)
    }
}

const fetchOrdersByEventObjId = async ({eventObjId, currentPageNumber, pageSize}: getOrdersByEventObjIdParamType) => {
    try{
        await connectToDatabase()
        // calculate skipped events according to currentPageNumber and pageSize
        const skippedAmount = (currentPageNumber - 1) * pageSize
        const orders = Order.find({event: eventObjId})
                            .skip(skippedAmount)
                            .limit(10)
                            .sort({ createdAt: "desc"})
                            .populate(
                                {
                                    path: "customer",
                                    model: User,
                                    select: "clerkId username"
                                }
                            )

        const totalOrdersNumber = await Order.countDocuments({event: eventObjId})
        const displayedOrders = await orders.exec()
        const isNext = totalOrdersNumber > displayedOrders.length + skippedAmount

        return {displayedOrders, isNext}
    } catch(error: any){
        throw new Error(`Failed to get orders: ${error.message}`)
    }
}

export {checkoutOrder, createOrder, fetchOrdersByUserId, fetchOrdersByEventObjId}