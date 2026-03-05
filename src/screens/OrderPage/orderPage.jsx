import React, { useState } from "react";
import { OrderPageWrapper } from "./orderPage.styles";
import CustomTabs from "@/components/lib/Tabs";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import EmptyState from "@/components/lib/EmptyState/EmptyState";
import OrderCard from "./components/OrderCard";
import { useGetUserOrders } from "@/network/orders";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("inprogress");
  const [skip, setSkip] = useState(0);
  const limit = 10;

  // Fetch orders using the new API
  const { data, isLoading, isError, error } = useGetUserOrders({ skip, limit });

  // Extract orders from API response
  const orders = data?.body?.orders || data?.orders || [];

  // Helper to determine status category using the correct field from the API
  const getStatusCategory = (order) => {
    const s = (order?.orderStatus || order?.status || "").toLowerCase();
    if (s.includes("delivered") || s.includes("completed")) return "completed";
    if (s.includes("cancelled")) return "cancelled";
    return "inprogress"; // processing, pending, picked, etc.
  };

  // Calculate counts for each tab
  const counts = orders.reduce(
    (acc, order) => {
      const category = getStatusCategory(order);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    { inprogress: 0, completed: 0, cancelled: 0 }
  );

  // Filter orders based on active tab
  const filteredOrders = orders.filter(
    (order) => getStatusCategory(order) === activeTab
  );

  const isEmpty = !isLoading && filteredOrders.length === 0;

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
          counts={counts}
        />
      </FlexibleDiv>

      {isLoading ? (
        <div className="loading_state">
          <p>Loading orders...</p>
        </div>
      ) : isError ? (
        <div className="error_state">
          <p>Error loading orders: {error?.message || "Something went wrong"}</p>
        </div>
      ) : isEmpty ? (
        <EmptyState
          title={"You have placed no orders yet!"}
          paragraph={
            "All your orders will be saved here for you to access their state anytime."
          }
        />
      ) : (
        <section className="orders_list">
          {filteredOrders.map((order) => (
            <OrderCard key={order?.orderId || order?.id || order?._id} order={order} />
          ))}
        </section>
      )}
    </OrderPageWrapper>
  );
}
