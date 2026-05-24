import React, { useState } from "react";
import { OrderPageWrapper } from "./orderPage.styles";
import { useGetUserOrders } from "@/network/orders";
import OrderCard from "./components/OrderCard";
import OrderCardSkeleton from "./components/OrderCardSkeleton";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart as ShopCartIcon } from "react-icons/ai";
import { useMainContext } from "@/context";

const TABS = [
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const getStatusCategory = (order) => {
  const s = (order?.orderStatus || order?.status || "").toLowerCase();
  if (s.includes("delivered") || s.includes("completed")) return "completed";
  if (s.includes("cancelled")) return "cancelled";
  return "inprogress";
};

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("inprogress");
  const { push } = useRouter();
  const { user, isLoadingUser } = useMainContext();
  const buyerId = user?._id || user?.id;

  const { data, isLoading, isError } = useGetUserOrders({
    buyerId,
    skip: 0,
    limit: 50,
    enabled: !isLoadingUser,
  });
  const orders = data?.orders || [];
  const isOrdersLoading = isLoadingUser || isLoading;

  const counts = orders.reduce(
    (acc, order) => {
      const cat = getStatusCategory(order);
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    { inprogress: 0, completed: 0, cancelled: 0 }
  );

  const filteredOrders = orders.filter(
    (order) => getStatusCategory(order) === activeTab
  );

  return (
    <OrderPageWrapper>
      {/* ── Page header ── */}
      <div className="page__header">
        <div>
          <h1>My Orders</h1>
          {!isOrdersLoading && !isError && (
            <p className="order__total__count">
              {orders.length} {orders.length === 1 ? "order" : "orders"} total
            </p>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tabs__bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab__btn${activeTab === tab.key ? " active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {!isOrdersLoading && (
              <span className={`tab__count${activeTab === tab.key ? " active" : ""}`}>
                {counts[tab.key] || 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="orders__content">
        {isOrdersLoading ? (
          <div className="orders__list">
            {[...Array(4)].map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="empty__state">
            <p className="empty__title">Unable to load orders</p>
            <p className="empty__subtitle">Check your connection and try again.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty__state">
            <div className="empty__icon__ring">
              <ShopCartIcon size={40} color="#ccc" />
            </div>
            <p className="empty__title">
              {activeTab === "inprogress" && "No active orders"}
              {activeTab === "completed" && "No completed orders yet"}
              {activeTab === "cancelled" && "No cancelled orders"}
            </p>
            <p className="empty__subtitle">
              {activeTab === "inprogress"
                ? "Orders you place will appear here while they're being processed."
                : activeTab === "completed"
                ? "Your delivered orders will show up here."
                : "Cancelled orders will be listed here."}
            </p>
            {activeTab === "inprogress" && (
              <button className="shop__btn" onClick={() => push("/shop")}>
                Shop Now
              </button>
            )}
          </div>
        ) : (
          <div className="orders__list">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order?.orderId || order?.id || order?._id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </OrderPageWrapper>
  );
}
