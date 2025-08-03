import { instance } from "./axios"

export const getAllReviews= async({id})=>{
    const data= await instance.get(`https://backend-oosri.onrender.com/api/v1/buyer/review/product/${id}`)

    return data
}