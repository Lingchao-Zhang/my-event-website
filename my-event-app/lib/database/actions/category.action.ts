"use server"
import { connectToDatabase } from ".."
import Category from "../models/category.model"

const createCategory = async (categoryName: string) => {
    try{
        await connectToDatabase()
        const newCategory = await Category.create(
            {
                name: categoryName
            }
        )

        return newCategory
    } catch(error: any){
        throw new Error(`Failed to create new category: ${error.message}`)
    }
}

const fetchAllCategories = async () => {
    try{
        await connectToDatabase()
        const allCategories = await Category.find()
        
        return allCategories
    } catch(error: any){
        throw new Error(`Failed to fetch all categories: ${error.message}`)
    }
}

export {createCategory, fetchAllCategories}