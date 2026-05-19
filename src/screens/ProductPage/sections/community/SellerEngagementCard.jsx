import React from "react";
import { SellerCardWrapper } from "./community.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export default function SellerEngagementCard({ seller, onNegotiate, user }) {
  if (!seller) return null;

  const initials = `${seller.firstName?.[0] || ""}${seller.lastName?.[0] || ""}`.toUpperCase();
  const responseRate = seller.responseRate ?? 87;
  const avgResponseTime = seller.avgResponseTime || "< 2 hrs";
  const isActive = seller.isActive !== false;

  return (
    <SellerCardWrapper>
      <FlexibleDiv className="seller__card__top">
        <div className="seller__info">
          <div className="seller__avatar">{initials || "S"}</div>
          <div className="seller__name__wrap">
            <p className="seller__name">
              {seller.firstName} {seller.lastName}
            </p>
            {isActive && (
              <p className="seller__active">
                <span className="dot" />
                Active now
              </p>
            )}
          </div>
        </div>

        <div className="seller__stats">
          <div className="stat__item">
            <p className="stat__value">{responseRate}%</p>
            <p className="stat__label">Response Rate</p>
          </div>
          <div className="stat__item">
            <p className="stat__value">{avgResponseTime}</p>
            <p className="stat__label">Response Time</p>
          </div>
        </div>
      </FlexibleDiv>

      <button
        className="negotiate__btn"
        onClick={() => {
          if (!user) {
            if (typeof window !== "undefined") {
              window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
            }
            return;
          }
          onNegotiate();
        }}
      >
        Make an Offer — Negotiate Price
      </button>
    </SellerCardWrapper>
  );
}
