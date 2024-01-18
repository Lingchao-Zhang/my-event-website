import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const isBase64Image = (imageData: string) => {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export { cn, isBase64Image, convertFileToUrl }