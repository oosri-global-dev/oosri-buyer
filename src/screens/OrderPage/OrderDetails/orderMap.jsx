"use client"
// import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { Popover } from 'antd';
import React, { useState } from 'react'
import { OrderMapWrapper } from './index.styles'
import { FlexibleDiv } from '@/components/lib/Box/styles'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCopy } from "react-icons/io";
import { FiPhone } from "react-icons/fi";

export default function OrderMap() {
    const [open, setOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("Text to copy")
      .then(() => {
        setOpen(true); // Show popover
      });
  };

  const handleMouseLeave = () => {
    setOpen(false); // Hide popover
  };
  return (
      // <APIProvider>
        <OrderMapWrapper>
          <h1>Track Order</h1>

            {/* <Map zoom={10} center={{lat: 53.54992, lng: 10.00678}} /> */}
            <FlexibleDiv width={"100%"} flexWrap={"noWrap"} alignItems={"start"} className='items_container'>
              <FlexibleDiv width="100%" flexDir={"column"} gap={"5px"} alignItems={"start"}>
                <h3 className='stat_title'>Order Status</h3>
                <p className='text_title'>Your order is on the way</p>
                <FlexibleDiv flexWrap={"noWrap"} className='stat_container' justifyContent={"start"}>
                  <span className='span_text'>
                    <p className='span_text_brown'>Distance left:</p>
                    <p className='span_text_black'>1.6KM</p>
                  </span>
                  <p  className='span_text_brown'>|</p>
                  <span>
                    <p className='span_text_brown'>Estimated time left:</p>
                    <p className='span_text_black'>1.6KM</p>
                  </span>
                </FlexibleDiv>
              </FlexibleDiv>
              {/* Delivery Address  */}
              <FlexibleDiv width="100%" flexDir={"column"} gap={"5px"} alignItems={"start"}>
                <h3 className='stat_title'>Delivery Address</h3>
                <FlexibleDiv flexWrap={"noWrap"} className='stat_container' justifyContent={"start"} flexDir={"column"}>
                  <FlexibleDiv className='span_text' gap={"8px"} justifyContent={"start"}>
                    <div className='location_bg'>
                      <FaLocationDot />
                    </div>
                    <div>
                      <p className='location_text_black span_text_black'>Kris Mall, Louis Mark Street</p>
                      <p className='span_text_brown location_text_brown'>Maitama, Abuja Nigeria</p>
                    </div>
                  </FlexibleDiv>
                </FlexibleDiv>
              </FlexibleDiv>
              {/* Delivery Options */}
              <FlexibleDiv width="100%" flexDir={"column"} gap={"5px"} alignItems={"start"}>
                <h3 className='stat_title'>Delivery Man</h3>
                <FlexibleDiv justifyContent={"start"} className='delivery_options' gap={"6px"} flexWrap={"noWrap"}>
                    <img src="https://placehold.co/400x600" alt="delivery man" />
                  <FlexibleDiv flexDir={"column"} justifyContent={"start"} alignItems={"start"}>
                    <h3>Donatus Okene</h3>
                    <p>KD083836</p>
                  </FlexibleDiv>
                </FlexibleDiv>
                <FlexibleDiv width={"100%"} bgColor={"#F5F5F5"} justifyContent={"space-between"} margin={"6px 0px 0px 0px"} flexWrap={"noWrap"} padding={"12px"} maxWidth={"350px"}
                  style={{
                    borderRadius:"12px"
                  }}>
                  <FlexibleDiv width={"fit-content"} gap={"12px"}>
                      <div className='phone-icon'>
                        <FiPhone />
                      </div>
                     <p className='phone_num'>081 575 383 0994</p>
                  </FlexibleDiv>
                   <Popover
                      content="Copied!"
                      trigger="click"
                      open={open}
                    >
                      <div
                        onClick={handleCopy}
                        onMouseLeave={handleMouseLeave}
                        className="copy_icon"
                        style={{ cursor: 'pointer' }}
                      >
                        <IoIosCopy />
                      </div>
                    </Popover>
                </FlexibleDiv>
              </FlexibleDiv>
            </FlexibleDiv>
        </OrderMapWrapper>
        // </APIProvider>
  )
}
