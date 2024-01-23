"use client"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get("category")
    useEffect(() => {
        if(query === ""){
            if(!categoryParam){
                router.push("/", {scroll: false})
            } else{
                router.push(`?category=${categoryParam}`, {scroll: false})
            }
        } else {
            if(!categoryParam){
                router.push(`?filter=${query}`, {scroll: false})
            } else{
                router.push(`?filter=${query}&category=${categoryParam}`, {scroll: false})
            }
        }
    },[query])
    return(
        <Input
            value={query}
            className="input-field"
            placeholder="title or username"
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

export default SearchBar