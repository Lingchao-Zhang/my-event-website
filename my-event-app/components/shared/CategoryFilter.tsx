"use client"
import { CategoryFilterType } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const CategoryFilter = ({categories}: CategoryFilterType) => {
    const [categoryType, setCategoryType] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const filterParam = searchParams.get("filter")
    useEffect(() => {
        if(categoryType === "" || categoryType === "Category"){
            if(!filterParam){
                router.push("/", {scroll: false})
            } else{
                router.push(`?filter=${filterParam}`, {scroll: false})
            }
        } else {
            if(!filterParam){
                router.push(`?category=${categoryType}`, {scroll: false})
            } else{
                router.push(`?filter=${filterParam}&category=${categoryType}`, {scroll: false})
            }
        }
    },[categoryType])
    return(
        <Select onValueChange={(e) => {setCategoryType(e)}}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem 
                    key="Category" 
                    value="Category" 
                    className="select-item p-regular-14"
                >
                    Category
                </SelectItem>
                {
                    categories.length > 0 ? 
                    categories.map((category) => 
                    <SelectItem 
                        key={category.name} 
                        value={category.name} 
                        className="select-item p-regular-14"
                    >
                            {category.name}
                    </SelectItem>
                    )
                    :
                    null
                }
            </SelectContent>
        </Select>

    )
}

export default CategoryFilter