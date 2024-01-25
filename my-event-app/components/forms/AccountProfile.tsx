"use client"
import { useUploadThing } from "@/lib/uploadthing"
import { userValidation } from "@/lib/validation/user"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AccountProfileType } from "@/types"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { createUser } from "@/lib/database/actions/user.action"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import FileUploader from "../shared/FileUploader"

const AccountProfile = ({ user }: AccountProfileType) => {
    const router = useRouter()
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader')
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
    
    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        let uploadedImageUrl = values.avatar
        
        if(files.length > 0) {
            const uploadedImages = await startUpload(files)

            if(!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        const onBoardingUser = {
            clerkId: user.clerkId,
            username: values.username,
            firstname: values.firstname,
            lastname: values.lastname,
            avatar: uploadedImageUrl
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
                        <FormControl className="flex-1 text-base-semibold text-gray-200">
                            <FileUploader 
                                imageUrl={field.value}
                                onChangeHandler={field.onChange}
                                setFiles={setFiles}
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