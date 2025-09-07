import React from 'react'
import Button from '../Button'
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { EmptyStateWrapper } from './EmptyState.styles'
import { useRouter } from 'next/navigation'

export default function EmptyState({title,paragraph}) {
    const router = useRouter()
  return (
    <EmptyStateWrapper maxWidth={"670px"}  margin={"0 auto"} flexDir={"column"}>
         <CartIcon />
        <h3>{title}</h3>
        <p>{paragraph}</p>
        <Button onClick={() => router.push('/')} padding={"0px 50px"} radius="12px" margin={"24px 0px"} backgroundColor='#FC5353' color="#FFFFFF">
            Continue Shopping
        </Button>
    </EmptyStateWrapper>
  )
}
