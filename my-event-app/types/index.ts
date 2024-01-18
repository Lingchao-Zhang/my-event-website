import { ObjectId } from "mongodb";
import { Document } from "mongoose"
import { Dispatch, SetStateAction } from "react";

export interface EventInterface extends Document {
    _id: ObjectId,
    title: string,
    description?: string,
    location?: string,
    createdAt: Date,
    imageUrl: string,
    startTime: Date,
    endTime: Date,
    price?: string,
    isFree: boolean,
    eventUrl?: string,
    catergory: { _id: ObjectId, name: string},
    createdBy: { _id: ObjectId, username: string}
}
export interface CategoryInterface extends Document{
    _id: ObjectId;
    name: string;
} 

export type userCreationParamType = {
    clerkId: string;
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
    
}

export type AccountProfileType = {
    user: {
        clerkId: string;
        username: string;
        firstname: string;
        lastname: string;
        avatar: string;
    }
}


export type EventFormType = {
    currentUserId: string; 
    type: "create" | "update";
    originalEvent?: EventInterface
}

export type DropdownType = {
    value: string;
    onChangeHandler: () => void;
}

export type FileUploaderType = {
    imageUrl: string;
    onChangeHandler: (url: string) => void;
    setFiles: Dispatch<SetStateAction<File[]>>
}