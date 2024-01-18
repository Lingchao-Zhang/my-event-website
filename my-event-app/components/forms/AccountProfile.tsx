"use client"
import { useUploadThing } from "@/lib/uploadthing"
import { userValidation } from "@/lib/validation/user"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AccountProfileType } from "@/types"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import Image from "next/image"
import { Input } from "../ui/input"
import { isBase64Image } from "@/lib/utils"
import { createUser } from "@/lib/database/actions/user.action"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const AccountProfile = ({ user }: AccountProfileType) => {
    const router = useRouter()
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media")
    const form = useForm<z.infer<typeof userValidation>>(
        {
            resolver: zodResolver(userValidation),
            defaultValues: {
                avatar: user.avatar || "",
                lastname: user.lastname || "",
                firstname: user.firstname || "",
                username: user.username || ""
            }
        }
    )

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldOnChange: (value: string) => void) => {
        e.preventDefault() 
        
        const fileReader = new FileReader()
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files))

            if(!file.type.includes("image")){
                return
            } else {
                fileReader.onload = async (event) => {
                    const imageDataUrl = event.target?.result?.toString() || ""
                    fieldOnChange(imageDataUrl)
                }
             fileReader.readAsDataURL(file)
            }
        }
    }

    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        const blob = values.avatar
        const isImageChanged = isBase64Image(blob)

        if(isImageChanged){
            const imgRes = await startUpload(files)

            if(imgRes && imgRes[0].url){
                values.avatar = imgRes[0].url
            }
        }

        const onBoardingUser = {
            clerkId: user.clerkId,
            username: values.username,
            firstname: values.firstname,
            lastname: values.lastname,
            avatar: values.avatar
        }

        await createUser(onBoardingUser)

        router.push("/")
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                        <FormLabel className="account-form_image-label">
                            {
                                field.value ? 
                                <Image 
                                src={field.value}
                                alt="profile image"
                                width={96}
                                height={96}
                                priority
                                className="rounded-full object-contain"
                                />
                                :
                                <Image 
                                src="/assets/images/test.png"
                                alt="profile image"
                                width={24}
                                height={24}
                                className="object-contain"
                                />
                            }
                        </FormLabel>
                        <FormControl className="flex-1 text-base-semibold text-gray-200">
                            <Input  
                                type="file"
                                accept="image/*"
                                placeholder="Upload a photo"
                                className="account-form_image-input"
                                onChange={(e) => handleImageChange(e, field.onChange)} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2">Lastname</FormLabel>
                        <FormControl>
                            <Input
                            className="account-form_input no-focus"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2">Firstname</FormLabel>
                        <FormControl>
                            <Input
                            className="account-form_input no-focus"
                            {...field}  
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2">Username</FormLabel>
                        <FormControl>
                        <Input
                            className="account-form_input no-focus"
                            {...field}  
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="button">Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile