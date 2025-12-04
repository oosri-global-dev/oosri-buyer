import React, { useState } from "react";
import { OrderPageWrapper } from "./orderPage.styles";
import CustomTabs from "@/components/lib/Tabs";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import EmptyState from "@/components/lib/EmptyState/EmptyState";
import OrderItem from "./components/orderItem";
import { PickupStation } from "./components/pickupStation";
import { NameTag } from "./components/nameTag";

export default function OrderPage() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [activeTab, setActiveTab] = useState(false);

  const OrderItems = {
    image: "https://placehold.co/600x400",
    title: "Redmi Hot 12 6.28’’ 4GB RAM/128 GB ROM Android 12 - Black",
    time: "2:15PM",
    id: "73383",
    price: "N820,000",
  };

  return (
    <OrderPageWrapper>
      <h1>My Orders</h1>
      <FlexibleDiv
        flexDir={"column"}
        margin={"14px 0px 0px 0px"}
        alignItems={"start"}
      >
        <CustomTabs
          active={(e) => {
            setActiveTab(e);
          }}
        />
      </FlexibleDiv>
      {isEmpty ? (
        <EmptyState
          title={"You have placed no orders yet!"}
          paragraph={
            "All your orders will be save here for you to access their state anytime."
          }
        />
      ) : (
        <section className="details_section">
          <NameTag />
          <OrderItem order={OrderItems} />
          <PickupStation />
        </section>
      )}
    </OrderPageWrapper>
  );
}
