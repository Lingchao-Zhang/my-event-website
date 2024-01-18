"use client"
import { eventDefaultValues } from "@/constants"
import { EventFormType } from "@/types"
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { Input } from "../ui/input"
import { eventValidation } from "@/lib/validation/event"
import Dropdown from "../shared/Dropdown"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Checkbox } from "../ui/checkbox"

const EventForm = ({ currentUserId, type, originalEvent }: EventFormType) => {
    const [files, setFiles] = useState<File[]>([])
    const eventInitialValue = type === "create" ? eventDefaultValues : originalEvent
    
    const form = useForm<z.infer<typeof eventValidation>>(
        {
            resolver: zodResolver(eventValidation),
            defaultValues: eventInitialValue
        }
    )

    const onSubmit = async (values: z.infer<typeof eventValidation>) => {}

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 m-5">
                <div className="flex flex-col gap-5 md:flex-row flex-wrap justify-center">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl>
                                <Input
                                className="input-field"
                                placeholder="Event title"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl>
                                <Dropdown 
                                    value={field.value}
                                    onChangeHandler={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl className="h-72">
                                <Textarea 
                                 placeholder="description"
                                 className="textarea rounded-2xl"
                                 {...field}
                                 />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl className="h-fit">
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
                        name="location"
                        render={({ field }) => (
                        <FormItem className="w-full md:mx-[9.5%]">
                            <FormControl>
                                <div className="flex h-[54px] rounded-full overflow-hidden bg-gray-100 px-4">
                                    <Image 
                                     src="/assets/icons/location.svg"
                                     alt="location icon"
                                     width={24}
                                     height={24}
                                     />
                                    <Input 
                                     className="input-field"
                                     placeholder="location"
                                     {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl>
                                <div className="flex-center h-[54px] rounded-full overflow-hidden bg-gray-100 px-4">
                                    <Image 
                                     src="/assets/icons/calendar.svg"
                                     alt="calendar icon"
                                     width={24}
                                     height={24}
                                     />
                                     <p className="ml-3 whitespace-nowrap text-grey-600">Start Time :</p>
                                     <DatePicker 
                                        selected={field.value} 
                                        onChange={(date) => field.onChange(date)} 
                                        showTimeSelect
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        wrapperClassName="datePicker"
                                     />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl>
                                <div className="flex-center h-[54px] rounded-full overflow-hidden bg-gray-100 px-4">
                                    <Image 
                                     src="/assets/icons/calendar.svg"
                                     alt="calendar icon"
                                     width={24}
                                     height={24}
                                     />
                                     <p className="ml-3 whitespace-nowrap text-grey-600">End Time :</p>
                                     <DatePicker 
                                        selected={field.value} 
                                        onChange={(date) => field.onChange(date)} 
                                        showTimeSelect
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        wrapperClassName="datePicker"
                                     />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl>
                                <div className="flex-center h-[54px] rounded-full overflow-hidden bg-gray-100 px-4">
                                    <Image 
                                     src="/assets/icons/dollar.svg"
                                     alt="dollar icon"
                                     width={24}
                                     height={24}
                                     />
                                    <Input type="number" placeholder="price" className="input-field" {...field} />
                                    <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Checkbox 
                                                        checked={field.value} 
                                                        onCheckedChange={field.onChange} 
                                                        id="isFree"
                                                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                                                    />
                                                    <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="eventUrl"
                        render={({ field }) => (
                        <FormItem className="w-full md:w-2/5">
                            <FormControl>
                                <div className="flex h-[54px] rounded-full overflow-hidden bg-gray-100 px-4">
                                    <Image 
                                     src="/assets/icons/link.svg"
                                     alt="link icon"
                                     width={24}
                                     height={24}
                                     />
                                    <Input 
                                     className="input-field"
                                     placeholder="url"
                                     {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="button md:w-1/4 md:mx-auto" disabled={form.formState.isSubmitting}>
                    {
                        form.formState.isSubmitting ? 
                        "Submitting"
                        :
                        `${type} Event`
                    }
                </Button>
            </form>
        </Form>
    )
}

export default EventForm