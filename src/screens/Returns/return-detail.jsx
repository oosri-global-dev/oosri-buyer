import styled from 'styled-components';
import { useMyReturnById } from '@/network/returns';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  font-family: Inter, sans-serif;
  padding: 20px 0 40px;

  .breadcrumb {
    font-size: 13px; color: #9E9E9E; margin: 0 0 20px;
    cursor: pointer;
    span { color: #333; font-weight: 600; }
  }

  .card {
    border: 1px solid #F0F0F0; border-radius: 12px;
    padding: 20px 24px; background: #fff; margin-bottom: 16px;
  }
  .card__title {
    font-size: 11px; font-weight: 700; color: #BBBBBB;
    text-transform: uppercase; letter-spacing: .05em;
    margin: 0 0 16px; padding-bottom: 12px;
    border-bottom: 1px solid #F5F5F5;
  }
  .detail__grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;
  }
  .detail__item {
    .d__label { font-size: 11px; color: #BBBBBB; font-weight: 600; text-transform: uppercase; letter-spacing:.04em; margin-bottom: 4px; }
    .d__value { font-size: 14px; color: #212121; font-weight: 500; text-transform: capitalize; }
  }

  .status__pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 20px;
    .dot { width: 6px; height: 6px; border-radius: 50%; }
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

  .timeline__item {
    display: flex; gap: 12px; margin-bottom: 16px;
    &:last-child { margin-bottom: 0; }
    .tl__dot__wrap {
      display: flex; flex-direction: column; align-items: center;
      .tl__dot { width: 10px; height: 10px; border-radius: 50%; background: #FC5353; flex-shrink: 0; margin-top: 4px; }
      .tl__line { flex: 1; width: 1px; background: #F0F0F0; margin-top: 4px; }
    }
    .tl__content {
      flex: 1; padding-bottom: 4px;
      .tl__status { font-size: 13px; font-weight: 600; color: #212121; text-transform: capitalize; margin: 0 0 2px; }
      .tl__note   { font-size: 12px; color: #888; margin: 0 0 2px; }
      .tl__time   { font-size: 11px; color: #BBBBBB; margin: 0; }
    }
  }

  .info__banner {
    background: #FFF8F8; border: 1px solid #FEDDDD; border-radius: 8px;
    padding: 12px 16px; font-size: 13px; color: #888; line-height: 1.6;
    margin-bottom: 16px;
    b { color: #FC5353; }
  }
`;

const STATUS_LABELS = {
  pending: 'Pending Review',
  seller_approved: 'Seller Approved',
  seller_rejected: 'Seller Rejected',
  escalated: 'Escalated',
  admin_approved: 'Approved — Awaiting Refund',
  admin_rejected: 'Rejected',
  refund_initiated: 'Refund Initiated',
  refunded: 'Refunded',
  closed: 'Closed',
};

const STATUS_DESCRIPTIONS = {
  pending: 'Your request has been received and is being reviewed.',
  seller_approved: 'The seller has approved your return.',
  seller_rejected: 'The seller rejected your return. It has been escalated to our team.',
  escalated: 'Our support team is reviewing your case.',
  admin_approved: 'Your return has been approved. A refund will be processed shortly.',
  admin_rejected: 'Unfortunately, your return request was not approved.',
  refund_initiated: 'Your refund is being processed by the payment provider.',
  refunded: 'Your refund has been successfully issued.',
  closed: 'This return request has been closed.',
};

function StatusPill({ status }) {
  return (
    <span className={`status__pill ${status}`}>
      <span className="dot" />
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default function ReturnDetail({ id }) {
  const router = useRouter();
  const { data, isLoading } = useMyReturnById(id);
  const r = data?.body || null;

  if (isLoading) return <Wrapper><p style={{ color: '#BBBBBB', fontSize: 14, textAlign: 'center', padding: 40 }}>Loading…</p></Wrapper>;
  if (!r) return <Wrapper><p style={{ color: '#BBBBBB', fontSize: 14, textAlign: 'center', padding: 40 }}>Return request not found.</p></Wrapper>;

  const orderId  = r.orderId?._id || r.orderId || '';
  const createdAt = r.createdAt
    ? new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  return (
    <Wrapper>
      <p className="breadcrumb">
        <span onClick={() => router.push('/returns')} style={{ cursor: 'pointer' }}>My Returns</span>
        {' / '}
        <span>Return #{String(r.id || r._id).slice(-8).toUpperCase()}</span>
      </p>

      {STATUS_DESCRIPTIONS[r.status] && (
        <div className="info__banner">
          <b>Status update:</b> {STATUS_DESCRIPTIONS[r.status]}
        </div>
      )}

      <div className="card">
        <p className="card__title">Return Details</p>
        <div className="detail__grid">
          <div className="detail__item">
            <p className="d__label">Status</p>
            <StatusPill status={r.status} />
          </div>
          <div className="detail__item">
            <p className="d__label">Reason</p>
            <p className="d__value">{(r.reason || '').replace(/_/g, ' ')}</p>
          </div>
          <div className="detail__item">
            <p className="d__label">Submitted</p>
            <p className="d__value">{createdAt}</p>
          </div>
          {r.refundAmountCents != null && (
            <div className="detail__item">
              <p className="d__label">Refund Amount</p>
              <p className="d__value" style={{ color: '#16A34A' }}>
                ${(r.refundAmountCents / 100).toFixed(2)}
              </p>
            </div>
          )}
          <div className="detail__item">
            <p className="d__label">Order</p>
            <p
              className="d__value"
              style={{ color: '#FC5353', cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onClick={() => router.push(`/order/${orderId}`)}
            >
              #{String(orderId).slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        {r.reasonDetail && (
          <div style={{ marginTop: 16, borderTop: '1px solid #F5F5F5', paddingTop: 14 }}>
            <p style={{ fontSize: 11, color: '#BBBBBB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 6px' }}>Your Description</p>
            <p style={{ fontSize: 14, color: '#555', margin: 0 }}>{r.reasonDetail}</p>
          </div>
        )}

        {r.adminNote && (
          <div style={{ marginTop: 16, borderTop: '1px solid #F5F5F5', paddingTop: 14 }}>
            <p style={{ fontSize: 11, color: '#BBBBBB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 6px' }}>Message from Support</p>
            <p style={{ fontSize: 14, color: '#555', margin: 0 }}>{r.adminNote}</p>
          </div>
        )}
      </div>

      {r.timeline?.length > 0 && (
        <div className="card">
          <p className="card__title">Activity</p>
          {r.timeline.map((t, i) => (
            <div className="timeline__item" key={i}>
              <div className="tl__dot__wrap">
                <div className="tl__dot" />
                {i < r.timeline.length - 1 && <div className="tl__line" />}
              </div>
              <div className="tl__content">
                <p className="tl__status">{(t.status || '').replace(/_/g, ' ')}</p>
                {t.note && <p className="tl__note">{t.note}</p>}
                <p className="tl__time">
                  {t.timestamp ? new Date(t.timestamp).toLocaleString('en-GB') : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
