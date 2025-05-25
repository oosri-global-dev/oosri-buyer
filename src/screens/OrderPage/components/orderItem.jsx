import Image from "next/image";
import { OrderItemWrapper} from "./orderComponent.styled";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "@/components/lib/Button";
import { Modal } from "antd";

export default function OrderItem({ order,showCancel }){
  const[modalOpen,setModalOpen]=useState(false)

  const handleCancel=()=>{
    setModalOpen(false)
  }
  const openModal=()=>{
    setModalOpen(true)
  }
  return (
    <OrderItemWrapper>
      <section className="wrapper">
        <div className="img_container">
        <img className="avatar_img" src="https://placehold.co/600x400" alt="product" />
        </div>
        <div className="text_container">
          <span className="top_bar">
            <p>Order #73383</p>
            <h3>Redmi Hot 12 6.28’’ 4GB RAM/128 GB ROM Android 12 - Black</h3>
          </span>
          <span className="bottom_bar">
            <h3>N820,000</h3>
            <p>Today @ 12:30PM</p>
          </span>
        </div>
      </section>
      {
        showCancel &&
        <div className="cancel_wrapper">
          <button className="cancel__button" onClick={openModal}>
            <span>
              <RiDeleteBinLine />
              CANCEL ORDER
            </span>
          </button>
        </div>
      }
      <Modal
        footer={false}
        centered
        open={modalOpen}
        closable={false}
      >
        <div
         style={{
          padding:"12px 40px"
         }}
        >
          <h3
          style={{
            fontFamily:"Inter",
            fontSize:"24px",
            fontWeight:"500",
            color:"#333333",
          }}
          >Cancel Order</h3>
          <p 
          style={{
            fontFamily:"Inter",
            color:"#777777"
          }}
          >Are you sure you want to cancel this order?</p>
          <div 
          style={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
            marginTop:"40px"
          }}
          >
            <Button border="1px solid #FC5353" borderColor={"#FC5353 !important"} radius={"12px"} width={"100%"} onClick={handleCancel} hoverBg={"transparent"} hoverColor={"black"}>
              Cancel
            </Button>
            <Button backgroundColor="#FC5353" radius={"12px"} width={"100%"} color={"white"}>
              Cancel Order
            </Button>
          </div>
        </div>
      </Modal>
    </OrderItemWrapper>
  );
};





