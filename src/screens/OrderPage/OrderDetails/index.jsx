import React, { useState } from 'react'
import { OrderDetailsWrapper } from './index.styles'
import { NameTag } from '../components/nameTag'
import OrderItem from '../components/orderItem'
import { PickupStation } from '../components/pickupStation'

export default function OrderDetailsScreen() {
    const [firstBC,setFirstBC]=useState("Order123")
  return (
    <OrderDetailsWrapper>
        <p className="breadcrumb__paragraph">
            Home / <span>{firstBC} </span>
        </p>
        <div className='top_section'>
            <span className='order_title'>
                <h3>Order #73383</h3>
                <span className='order_status picked'>
                    Order picked
                </span>
            </span>
            <span className='order_status track'>
                Track Order
            </span>
        </div>
        <p className='time_frame'>Today @ 12:30PM</p>
        <div>
            <NameTag />
            <OrderItem showCancel={true} />
            <span className='total_amount'>
                <p className='total_text'>Sub Total:</p>
                <p>N820,000</p>
            </span>
            <PickupStation />
            <span className='total_amount'>
                <p className='total_text'>Grand Total:</p>
                <p>N820,500</p>
            </span>
        </div>
    </OrderDetailsWrapper>
  )
}
