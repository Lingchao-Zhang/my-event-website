"use client"

import * as z from "zod"

export const eventValidation = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(500),
    location: z.string().min(3).max(500),
    imageUrl: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    price: z.string(),
    isFree: z.boolean(),
    eventUrl: z.string().url(),
    categoryId: z.string(),
})