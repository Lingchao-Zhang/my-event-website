"use server"

import { userCreationParamType } from "@/types";
import { connectToDatabase } from "..";
import User from "../models/user.model";
import Event from "../models/event.model";

const createUser = async (userInfo: userCreationParamType) => {
    try{
        await connectToDatabase()
        const user = await User.findOne({ clerkId: userInfo.clerkId }) 
        if(!user){
            await User.create({
                ...userInfo,
                onboarded: true
            })
        } else {
            throw new Error("user existed!")
        }

    } catch(error: any){
        throw new Error(`Failed to create new user: ${error.message}`)
    }
}

const fetchUserById = async (userId: string) => {
    try{
        await connectToDatabase()

        const user = await User.findOne({ clerkId: userId })
        
        return user
    } catch(error: any){
        throw new Error(`Failed to fetch the user: ${error.message}`)
    }
}

export { createUser, fetchUserById }