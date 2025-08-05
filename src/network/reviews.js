import { instance } from "./axios"

export const getAllReviews= async (id,page=1)=>{
    const {data} =await instance.get(`buyer/review/product/${id}?`,{
        params:{
            page: page,
            limit: 5,
        }
    });
    return data
}