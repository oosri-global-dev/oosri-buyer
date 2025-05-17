import React from 'react'
import Button from '../Button'
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { EmptyStateWrapper } from './EmptyState.styles'
import { useRouter } from 'next/navigation'

export default function EmptyState() {
    const router = useRouter()
  return (
    <EmptyStateWrapper maxWidth={"670px"}  margin={"0 auto"} flexDir={"column"}>
         <CartIcon />
        <h3>You haven’t saved an item yet!</h3>
        <p>Spotted something appealing? Simply tap the heart-shaped icon beside the item to save it to your wishlist! All your cherished items will be displayed here.</p>
        <Button onClick={() => router.push('/')} padding={"0px 50px"} radius="12px" margin={"24px 0px"} backgroundColor='#FC5353' color="#FFFFFF">
            Continue Shopping
        </Button>
    </EmptyStateWrapper>
  )
}
