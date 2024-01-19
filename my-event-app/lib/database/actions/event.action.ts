"use server"

import { eventCreationParamType } from "@/types"
import { connectToDatabase } from ".."
import Event from "../models/event.model"
import User from "../models/user.model"
import { ObjectId } from "mongoose"

const createEvent = async (eventCreationParams: eventCreationParamType) => {
    try{
        await connectToDatabase()
        // 1. create event 
        const newEvent = await Event.create(eventCreationParams)
        
        // 2. find event organizer
        const organizer = await User.findOne({_id: eventCreationParams.createdBy})

        // 3. add the event to organizedEvents of the organizer
        organizer.organisedEvents.push(newEvent._id)

        // 4. save the updated organizer
        await organizer.save()

        return newEvent 
    } catch(error: any){
        throw new Error(`Failed to create new event: ${error.message}`)
    }
}

const fetchEventDetailById = async (eventId: ObjectId) => {
    try{
        await connectToDatabase()
        const eventDetail = await Event.findOne({ _id: eventId })
                                       .populate(
                                        {
                                            path: "createdBy",
                                            model: User,
                                            select: "clerkId username"
                                        }
                                       )

        return eventDetail
    } catch(error: any){
        throw new Error(`Failed to fetch the event detail: ${error.message}`)
    }
}

const fetchAllEvents = async (currentPageNumber: number, pageSize: number, categoryType?: string) => {
    try{
        await connectToDatabase()
        
        // calculate skipped events according to currentPageNumber and pageSize
        const skippedAmount = (currentPageNumber - 1) * pageSize

        // if user selected particular category as filter
        const allEvents = categoryType ? 
              Event.find({category: categoryType})
                   .skip(skippedAmount)
                   .sort({ createdAt: "desc"})
                   .limit(pageSize)
                   .populate(
                    {
                        path: "createdBy",
                        model: User,
                        select: "clerkId username"
                    }
                   )
                    :
              Event.find()
                   .skip(skippedAmount)
                   .sort({ createdAt: "desc"})
                   .limit(pageSize)
                   .populate(
                       {
                           path: "createdBy",
                           model: User,
                           select: "clerkId username"
                       }
                   )
        
        const totalEventsNumber = categoryType ? await Event.countDocuments({category: categoryType}) : await Event.countDocuments()
        const displayedEvents = await allEvents.exec()
        const isNext = totalEventsNumber > displayedEvents.length + pageSize

        return {allEvents, isNext}
    } catch(error: any){
        throw new Error(`Failed to fetch all events: ${error.message}`)
    }
}

export {createEvent, fetchEventDetailById, fetchAllEvents}