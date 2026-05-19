import { useState } from 'react';
import styled from 'styled-components';
import { useMyReturns } from '@/network/returns';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  font-family: Inter, sans-serif;
  padding: 20px 0 40px;

  .page__header {
    margin-bottom: 24px;
    h2 { font-size: 24px; font-weight: 700; color: #212121; margin: 0 0 4px; }
    p  { font-size: 13px; color: #9E9E9E; margin: 0; }
  }

  .empty__state {
    text-align: center; padding: 60px 20px;
    .icon { font-size: 48px; margin-bottom: 12px; }
    h4 { font-size: 16px; font-weight: 600; color: #333; margin: 0 0 6px; }
    p  { font-size: 13px; color: #9E9E9E; margin: 0; }
  }

  .return__card {
    border: 1px solid #F0F0F0;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 12px;
    background: #fff;
    cursor: pointer;
    transition: border-color .15s, box-shadow .15s;
    &:hover { border-color: #FC5353; box-shadow: 0 2px 8px rgba(252,83,83,.08); }

    .card__top {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 10px;
    }
    .order__ref { font-size: 12px; color: #BBBBBB; font-family: monospace; }
    .card__reason {
      font-size: 14px; font-weight: 600; color: #212121;
      text-transform: capitalize; margin: 0 0 4px;
    }
    .card__date { font-size: 12px; color: #BBBBBB; margin: 0; }
  }

  .status__pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 20px;
    .dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

    &.pending          { background: #FFFBEB; color: #B45309; .dot { background: #F59E0B; } }
    &.seller_approved  { background: #F0FDF4; color: #15803D; .dot { background: #16A34A; } }
    &.seller_rejected  { background: #FEF2F2; color: #B91C1C; .dot { background: #DC2626; } }
    &.escalated        { background: #FEF3C7; color: #92400E; .dot { background: #F59E0B; } }
    &.admin_approved   { background: #EFF6FF; color: #1D4ED8; .dot { background: #3B82F6; } }
    &.admin_rejected   { background: #FEF2F2; color: #B91C1C; .dot { background: #DC2626; } }
    &.refund_initiated { background: #F5F3FF; color: #6D28D9; .dot { background: #7C3AED; } }
    &.refunded         { background: #F0FDF4; color: #15803D; .dot { background: #16A34A; } }
    &.closed           { background: #F9FAFB; color: #6B7280; .dot { background: #9CA3AF; } }
  }

  .load__more {
    width: 100%; height: 44px; margin-top: 8px;
    background: #fff; border: 1px solid #E0E0E0; border-radius: 8px;
    font-size: 14px; font-weight: 600; color: #555;
    cursor: pointer; font-family: inherit; transition: background .15s;
    &:hover { background: #F5F5F5; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
`;

const STATUS_LABELS = {
  pending: 'Pending Review',
  seller_approved: 'Seller Approved',
  seller_rejected: 'Seller Rejected',
  escalated: 'Escalated',
  admin_approved: 'Approved',
  admin_rejected: 'Rejected',
  refund_initiated: 'Refund Initiated',
  refunded: 'Refunded',
  closed: 'Closed',
};

function StatusPill({ status }) {
  return (
    <span className={`status__pill ${status}`}>
      <span className="dot" />
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default function MyReturns() {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useMyReturns({ skip: 0, limit });

  const returns = data?.body?.returns || [];
  const total   = data?.body?.total   || 0;

  if (isLoading) {
    return (
      <Wrapper>
        <div className="page__header">
          <h2>My Returns</h2>
          <p>Track the status of your return requests</p>
        </div>
        <p style={{ color: '#BBBBBB', fontSize: 14, textAlign: 'center', padding: 40 }}>Loading…</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="page__header">
        <h2>My Returns</h2>
        <p>Track the status of your return requests</p>
      </div>

      {returns.length === 0 ? (
        <div className="empty__state">
          <div className="icon">📦</div>
          <h4>No return requests yet</h4>
          <p>If you need to return an order, open the order detail page and click &quot;Request Return&quot;.</p>
        </div>
      ) : (
        <>
          {returns.map((r) => {
            const orderId = r.orderId?._id || r.orderId || '';
            const createdAt = r.createdAt
              ? new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
              : '';

            return (
              <div
                key={String(r.id || r._id)}
                className="return__card"
                onClick={() => router.push(`/returns/${r.id || r._id}`)}
              >
                <div className="card__top">
                  <span className="order__ref">
                    Order #{String(orderId).slice(-8).toUpperCase()}
                  </span>
                  <StatusPill status={r.status} />
                </div>
                <p className="card__reason">{(r.reason || '').replace(/_/g, ' ')}</p>
                <p className="card__date">Submitted {createdAt}</p>
              </div>
            );
          })}

          {returns.length < total && (
            <button
              className="load__more"
              disabled={isLoading}
              onClick={() => setLimit((l) => l + 10)}
            >
              Load more ({total - returns.length} remaining)
            </button>
          )}
        </>
      )}
    </Wrapper>
  );
}
