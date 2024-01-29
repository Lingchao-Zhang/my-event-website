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

export interface OrderInterface{
    orderId: string;
    ticketAmount: string;
    customer: {
        clerkId: string;
        username: string;
    }
    event: {
        eventObjId: ObjectId;
        title: string;
    },
    createdAt: Date;
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
    eventObjId: ObjectId;
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
    id: string;
}

export type ProfileSearchParamsType = {
    eventsPageNumber: number;
    userOrdersPageNumber: number;
    eventOrdersPageNumber: number;
}

export type searchParamsType = {
    filter: string;
    category: string;
    page: string;
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

export type CheckoutButtonType = {
    eventObjectId: ObjectId;
    eventTitle: string;
    endTime: Date;
    isFree: boolean;
    price: string;
}

export type CheckoutType = {
    eventObjectId: ObjectId;
    eventTitle: string;
    isFree: boolean;
    price: string;
    customerId: string;
}

export type createOrderParamType = {
    orderId: string;
    ticketAmount: string;
    customer: string;
    event: ObjectId;
    createdAt: Date;
}

export type getOrdersByUserIdParamType = {
    customerId: string;
    currentPageNumber: number;  
    pageSize: number;
}

export type CheckoutOrderParamsType = {
    eventTitle: string;
    isFree: boolean;
    ticketAmount: number;
    price: string;
    eventObjId: ObjectId;
    customerId: string;
}

export type OrdersDetailTableType = {
    type: "Orders of user" | "Orders of event"
    orders: OrderInterface[]
}

export type PaginationType = {
    pageIndexName: "page" | "eventsPageNumber" | "userOrdersPageNumber" | "eventOrdersPageNumber";
    pageNumber: number;
    isNext: boolean;
    currentPath: string;
    totalPageNumber: number;
}

export type fetchEventsByUserIdParamType = {
    currentPageNumber: number;  
    pageSize: number;
    userId: string;
}