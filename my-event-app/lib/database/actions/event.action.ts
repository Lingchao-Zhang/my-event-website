"use server"

import { eventCreationParamType, fetchEventsParamType } from "@/types"
import { connectToDatabase } from ".."
import Event from "../models/event.model"
import User from "../models/user.model"
import { ObjectId } from "mongoose"

const getObjectIdByUsername = async (username: string) => {
    try{
        await connectToDatabase()
        const user = await User.findOne({username: username})
        if(!user){
            return null
        }
        return user._id

    } catch(error: any){
        throw new Error(`Failed to get ObjectId through username: ${error.message}`)
    }
}

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

const fetchAllEvents = async ({currentPageNumber, pageSize, categoryType, searchParam}: fetchEventsParamType) => {
    try{
        await connectToDatabase()
        
        // calculate skipped events according to currentPageNumber and pageSize
        const skippedAmount = (currentPageNumber - 1) * pageSize
        const regex = new RegExp(searchParam, "i")
        const trimmedSearchParam = searchParam.trim()
        let allEvents
        let totalEventsNumber 
        // if user selected particular category and search params as filter
        if(categoryType && trimmedSearchParam !== ""){
            // user can use username or title as search params 
            const objectId = await getObjectIdByUsername(trimmedSearchParam)
            // if objectId exists -> search param is username
            // if objectId is null -> search param is title
            allEvents = objectId ? Event.find({category: categoryType, createdBy: objectId})
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
            Event.find({category: categoryType, title: {$regex: regex}})
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
            totalEventsNumber = objectId ? await Event.countDocuments({category: categoryType, createdBy: objectId})
                                         : await Event.countDocuments({category: categoryType, title: {$regex: regex}})
        } else if(categoryType && trimmedSearchParam === ""){
            allEvents = Event.find({category: categoryType})
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
            totalEventsNumber = await Event.countDocuments({category: categoryType})
        } else if(trimmedSearchParam !== "" && !categoryType){
            // user can use username or title as search params 
            const objectId = await getObjectIdByUsername(trimmedSearchParam)
            // if objectId exists -> search param is username
            // if objectId is null -> search param is title
            allEvents = objectId ? Event.find({createdBy: objectId})
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
            Event.find({title: {$regex: regex}})
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
            totalEventsNumber = objectId ? await Event.countDocuments({createdBy: objectId})
                                         : await Event.countDocuments({title: {$regex: regex}})
        } else {
            allEvents = Event.find()
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
            totalEventsNumber = await Event.countDocuments()
        }
              
        const displayedEvents = await allEvents.exec()
        const isNext = totalEventsNumber > displayedEvents.length + pageSize

        return {displayedEvents, isNext}
    } catch(error: any){
        throw new Error(`Failed to fetch all events: ${error.message}`)
    }
}

export {createEvent, fetchEventDetailById, fetchAllEvents}