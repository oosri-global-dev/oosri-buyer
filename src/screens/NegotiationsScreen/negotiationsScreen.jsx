import React, { useState } from "react";
import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useNegotiation } from "@/hooks/useNegotiation";
import { formatCurrency } from "@/data-helpers/hooks";
import Link from "next/link";

const Wrapper = styled(FlexibleDiv)`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  h1 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
  }

  .filter__row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    button {
      padding: 6px 16px;
      border-radius: 20px;
      border: 1px solid rgba(187, 187, 187, 0.4);
      background: transparent;
      color: #555;
      font-size: 0.82rem;
      cursor: pointer;

      &.active {
        background: var(--orrsiPrimary);
        border-color: var(--orrsiPrimary);
        color: #fff;
        font-weight: 600;
      }
    }
  }

  .empty__msg {
    color: #888;
    font-size: 0.9rem;
    text-align: center;
    width: 100%;
    padding: 40px 0;
  }
`;

const NegotiationCard = styled.div`
  width: 100%;
  border: 1px solid rgba(187, 187, 187, 0.3);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .neg__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;

    .product__name {
      font-weight: 600;
      font-size: 1rem;
      margin: 0;
    }

    .status__badge {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: capitalize;

      &.pending { background: #fef9c3; color: #854d0e; }
      &.countered { background: #dbeafe; color: #1e40af; }
      &.accepted { background: #d1fae5; color: #065f46; }
      &.rejected { background: #fee2e2; color: #991b1b; }
      &.expired { background: #f3f4f6; color: #6b7280; }
      &.completed { background: #ede9fe; color: #4c1d95; }
    }
  }

  .neg__prices {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    .price__item {
      .price__label { font-size: 0.72rem; color: #888; margin: 0; }
      .price__value { font-weight: 600; font-size: 0.95rem; margin: 0; }
    }
  }

  .neg__actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    button, a {
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      text-decoration: none;
      display: inline-flex;
      align-items: center;

      &.accept {
        background: #22c55e;
        color: #fff;
      }

      &.reject {
        background: transparent;
        border: 1px solid #ef4444;
        color: #ef4444;
      }

      &.checkout {
        background: var(--orrsiPrimary);
        color: #fff;
      }
    }
  }
`;

const STATUS_FILTERS = [
  { label: "All", value: undefined },
  { label: "Pending", value: "pending" },
  { label: "Countered", value: "countered" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Expired", value: "expired" },
];

export default function NegotiationsScreen() {
  const [statusFilter, setStatusFilter] = useState(undefined);
  const { negotiationsData, isLoading, accept, reject } = useNegotiation();

  const all = negotiationsData?.data?.negotiations || [];
  const filtered = statusFilter ? all.filter((n) => n.status === statusFilter) : all;

  return (
    <Wrapper>
      <h1>My Negotiations</h1>

      <div className="filter__row">
        {STATUS_FILTERS.map((f) => (
          <button
            key={String(f.value)}
            className={statusFilter === f.value ? "active" : ""}
            onClick={() => setStatusFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="empty__msg">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="empty__msg">No negotiations found.</p>
      ) : (
        filtered.map((neg) => (
          <NegotiationCard key={neg._id}>
            <div className="neg__top">
              <p className="product__name">
                {neg.productId?.productName || "Product"}
              </p>
              <span className={`status__badge ${neg.status}`}>{neg.status}</span>
            </div>

            <div className="neg__prices">
              <div className="price__item">
                <p className="price__label">Listed</p>
                <p className="price__value">{formatCurrency(neg.originalPrice)}</p>
              </div>
              <div className="price__item">
                <p className="price__label">Your Offer</p>
                <p className="price__value">{formatCurrency(neg.requestedPrice)}</p>
              </div>
              {neg.counterPrice && (
                <div className="price__item">
                  <p className="price__label">Counter Offer</p>
                  <p className="price__value">{formatCurrency(neg.counterPrice)}</p>
                </div>
              )}
              {neg.finalPrice && (
                <div className="price__item">
                  <p className="price__label">Agreed Price</p>
                  <p className="price__value" style={{ color: "#22c55e" }}>
                    {formatCurrency(neg.finalPrice)}
                  </p>
                </div>
              )}
            </div>

            {neg.status === "countered" && (
              <div className="neg__actions">
                <button
                  className="accept"
                  onClick={() => accept.mutate(neg._id)}
                  disabled={accept.isPending}
                >
                  Accept Counter
                </button>
                <button
                  className="reject"
                  onClick={() => reject.mutate({ negotiationId: neg._id })}
                  disabled={reject.isPending}
                >
                  Decline
                </button>
              </div>
            )}

            {neg.status === "accepted" && neg.checkoutToken && (
              <div className="neg__actions">
                <Link
                  href={`/checkout?negotiation=${neg.checkoutToken}`}
                  className="checkout"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </NegotiationCard>
        ))
      )}
    </Wrapper>
  );
}
