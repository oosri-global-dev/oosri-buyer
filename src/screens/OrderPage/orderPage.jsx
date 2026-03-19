import React, { useState } from "react";
import { OrderPageWrapper } from "./orderPage.styles";
import CustomTabs from "@/components/lib/Tabs";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import EmptyState from "@/components/lib/EmptyState/EmptyState";
import OrderCard from "./components/OrderCard";
import { useGetUserOrders } from "@/network/orders";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  // Fetch orders using the new API
  const { data, isLoading, isError, error } = useGetUserOrders({ skip, limit });

  // Extract orders from API response
  const orders = data?.body?.orders || data?.orders || [];
  const isEmpty = !isLoading && orders.length === 0;

  // Filter orders based on active tab if needed
  const getFilteredOrders = () => {
    if (!orders || orders.length === 0) return [];

    // Tab filtering logic - adjust based on your tab configuration
    // activeTab 0 = All, 1 = Pending, 2 = Delivered, etc.
    if (activeTab === 0) return orders;

    // Add your tab-based filtering logic here
    // Example: return orders.filter(order => order.status === tabStatus);
    return orders;
  };

  const filteredOrders = getFilteredOrders();

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
                  <OrderCard key={order?.id || order?._id} order={order} />
                ))}
        </section>
      )}
    </OrderPageWrapper>
  );
}
