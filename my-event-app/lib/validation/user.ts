"use client"

import * as z from "zod"

export const userValidation = z.object({
  avatar: z.string().url(),
  lastname: z.string().min(3).max(50),
  firstname: z.string().min(3).max(50),
  username: z.string().min(2).max(100)
})