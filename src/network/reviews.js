import { instance } from "./axios"

export const getAllReviews= async (id)=>{
    const {data} =await instance.get(`buyer/review/product/${id}`);
    return data
}