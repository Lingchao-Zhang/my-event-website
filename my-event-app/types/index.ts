import { Document, ObjectId } from "mongoose"
import { Dispatch, SetStateAction } from "react";

export interface EventInterface extends Document {
    _id: ObjectId,
    title: string,
    description: string,
    location: string,
    createdAt: Date,
    imageUrl: string,
    startTime: Date,
    endTime: Date,
    price: string,
    isFree: boolean,
    eventUrl: string,
    category: string,
    createdBy: { clerkId: string, username: string}
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

export type profileParamsType = {
    id: string
}

export type searchParamsType = {
    filter: string;
    category: string;
}

export type fetchEventsParamType = {
    currentPageNumber: number; 
    pageSize: number; 
    categoryType?: string;
    searchParam: string;
}

export type EventCardType = {
    currentUserId: string;
    objectId: ObjectId;
    imageUrl: string;
    isFree: boolean;
    price: string;
    category: string;
    startTime: Date;
    title: string;
    organizer: {
        clerkId: string;
        username: string;
    }
}

export type fetchRelatedEventsParamType = {
    originalEventObjectId: ObjectId;
    categoryType: string;
    organizerId: string;
}

export type CategoryFilterType = {
    categories: CategoryInterface[]
}

export type updateEventParamType = {
    eventObjectId: ObjectId,
    eventUpdateInfo: {
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
    }
}

export type DeleteConfirmationType = {
    objectId: ObjectId
}

export type ProfileHeaderType = {
    userProfile: userCreationParamType
}

export type NavItemsType = {
    userClerkId: string
}