"use client"
import { PaginationType } from "@/types"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const Pagination = ({
    pageIndexName,
    pageNumber,
    isNext,
    currentPath,
    totalPageNumber
}: PaginationType) => {
    const router = useRouter()
    const pageNumberArray: Number[] = []
    for(let i = 0; i < totalPageNumber; i++){
        pageNumberArray.push(i+1)
    }
    const handleNavigation = (navigationIndex: string) => {
        if(navigationIndex === "prev"){
            router.push(`${currentPath}${currentPath.includes("?") ? "&" : "?"}${pageIndexName}=${pageNumber - 1}`, {scroll: false})
        } else if(navigationIndex === "next"){
            router.push(`${currentPath}${currentPath.includes("?") ? "&" : "?"}${pageIndexName}=${pageNumber + 1}`, {scroll: false})
        } else {
            router.push(`${currentPath}${currentPath.includes("?") ? "&" : "?"}${pageIndexName}=${navigationIndex}`, {scroll: false})
        }
    } 
    return(
        <div className='pagination'>
            <Button
                onClick={() => handleNavigation("prev")}
                disabled={pageNumber === 1}
                className='!text-small-regular'
            >
                Prev
            </Button>
            {
                pageNumberArray.map((page) => (
                    <Button 
                        key={String(page)} 
                        className={`${!pageNumber && page === 1 || pageNumber === page ? "": "bg-white text-black"}'!text-small-regular'`}
                        onClick={() => handleNavigation(String(page))}
                    >
                        {String(page)}
                    </Button>
                ))
            }
            <Button
                onClick={() => handleNavigation("next")}
                disabled={!isNext}
                className='!text-small-regular'
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination