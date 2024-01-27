"use server"

import { eventCreationParamType, fetchEventsParamType, fetchRelatedEventsParamType, updateEventParamType } from "@/types"
import { connectToDatabase } from ".."
import Event from "../models/event.model"
import User from "../models/user.model"
import { ObjectId } from "mongoose"

const getObjectIdByUsername = async (searchedUsername: string) => {
    try{
        await connectToDatabase()
        const regex = new RegExp(searchedUsername, "i")
        const user = await User.findOne({username: {$regex: regex}})
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
        const isNext = totalEventsNumber > displayedEvents.length + skippedAmount

        return {displayedEvents, isNext}
    } catch(error: any){
        throw new Error(`Failed to fetch all events: ${error.message}`)
    }
}

const fetchRelatedEvents = async ({originalEventObjectId, categoryType, organizerId}: fetchRelatedEventsParamType) => {
    try{
        await connectToDatabase()
        // related events have either the same category or the same organizer with the original event 
        const organizer = await User.findOne({clerkId: organizerId})
        const relatedEvent = await Event.find({_id: {$ne: originalEventObjectId}, $or: [{category: categoryType}, {createdBy: organizer._id}]})
                                        .limit(12)
                                        .populate(
                                            {
                                                path: "createdBy",
                                                model: User,
                                                select: "clerkId username"
                                            }
                                        )

        return relatedEvent
    } catch(error: any){
        throw new Error(`Failed to fetch the related events: ${error.message}`)
    }
}

const updateEvent = async ({eventObjectId, eventUpdateInfo}: updateEventParamType) => {
    try{
        await connectToDatabase()
        const event = Event.findOneAndUpdate(
            {_id: eventObjectId},
            eventUpdateInfo
        )

        return event
    } catch(error: any){
        throw new Error(`Failed to update the event: ${error.message}`)
    }
}

const deleteEvent = async (eventObjectId: ObjectId) => {
    try{
        await connectToDatabase()
        // 1. find the event
        const event = await Event.findOne({_id: eventObjectId})

        // 2. find the organizer of the event and remove the event from his organized events
        await User.findOneAndUpdate(
            {_id: event.createdBy},
            {$pull: {organisedEvents: eventObjectId}}
        )

        // 3. delete the event
        await Event.findOneAndDelete({_id: eventObjectId})
    } catch(error: any){
        throw new Error(`Failed to delete the event: ${error.message}`)
    }
}

export {createEvent, fetchEventDetailById, fetchAllEvents, fetchRelatedEvents, updateEvent, deleteEvent}