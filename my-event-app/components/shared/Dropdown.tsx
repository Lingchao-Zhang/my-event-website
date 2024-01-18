"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"
  
import { CategoryInterface, DropdownType } from "@/types"
import { startTransition, useState } from "react"
import { Input } from "../ui/input"
  
const Dropdown = ({ value, onChangeHandler }: DropdownType) => {
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    const [newCategory, setNewCategory] = useState("")
    const handleAddNewCategory = () => {
        // add new category to db
    }

    return(
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.length > 0 ? 
                    categories.map((category) => (
                        <SelectItem key={category.name} value={category.name} className="select-item p-regular-14">
                            {category.name}
                        </SelectItem>
                    ))
                    :
                    null
                }
                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
                        Add a new category
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                        <AlertDialogTitle>New category</AlertDialogTitle>
                        <AlertDialogDescription>
                           <Input placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)}/>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(handleAddNewCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>

        </Select>

    )
}

export default Dropdown