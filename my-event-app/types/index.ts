import { Document, ObjectId } from "mongoose"
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
    category: string,
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
    user: userCreationParamType
}

export type EventFormType = {
    currentUserObjectId: ObjectId; 
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

export type eventCreationParamType = {
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    location: string;
    startTime: Date;
    endTime: Date;
    price: string;
    isFree: boolean;
    eventUrl: string;
    createdBy: ObjectId; 
    createdAt: Date;
}

export type EventDetailType = {
    currentUserId: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    location: string;
    startTime: Date;
    endTime: Date;
    price: string;
    isFree: boolean;
    eventUrl: string;
    organizer: {
        clerkId: string;
        username: string;
    }
    createdAt: Date;
}

export type paramsType = {
    id: ObjectId
}
