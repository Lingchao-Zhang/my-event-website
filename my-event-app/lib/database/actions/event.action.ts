"use server"

import { eventCreationParamType } from "@/types"
import { connectToDatabase } from ".."
import Event from "../models/event.model"
const createEvent = async (eventCreationParams: eventCreationParamType) => {
    try{
        await connectToDatabase()
        
        const newEvent = Event.create(eventCreationParams)

        return newEvent 
    } catch(error: any){
        throw new Error(`Failed to create new event: ${error.message}`)
    }
}

export {createEvent}