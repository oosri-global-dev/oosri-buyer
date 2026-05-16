import { useState } from 'react';
import styled from 'styled-components';
import { useSubmitReturn } from '@/network/returns';
import { useQueryClient } from '@tanstack/react-query';

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 16px;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  width: 100%; max-width: 460px;
  max-height: 90vh; overflow-y: auto;
  font-family: Inter, sans-serif;
  position: relative;

  h3 { font-size: 18px; font-weight: 700; color: #212121; margin: 0 0 6px; }
  .subtitle { font-size: 13px; color: #9E9E9E; margin: 0 0 24px; }

  .close__btn {
    position: absolute; top: 16px; right: 16px;
    background: none; border: none; font-size: 22px;
    cursor: pointer; color: #9E9E9E; line-height: 1;
  }

  label {
    display: block; font-size: 13px; font-weight: 600;
    color: #333; margin-bottom: 6px;
  }

  select, textarea {
    width: 100%; border: 1px solid #E0E0E0; border-radius: 8px;
    padding: 10px 12px; font-size: 14px; font-family: inherit;
    color: #212121; outline: none; background: #fff;
    transition: border-color .15s; box-sizing: border-box;
    &:focus { border-color: #FC5353; }
  }

  textarea { resize: vertical; min-height: 90px; }

  .field { margin-bottom: 18px; }

  .char__count { font-size: 11px; color: #BBBBBB; text-align: right; margin-top: 3px; }

  .note__box {
    background: #FFF8F8; border: 1px solid #FEDDDD;
    border-radius: 8px; padding: 12px 14px;
    font-size: 12px; color: #888; margin-bottom: 20px;
    line-height: 1.5;
    b { color: #FC5353; }
  }

  .actions {
    display: flex; gap: 10px; margin-top: 4px;
    button {
      flex: 1; height: 44px; border-radius: 8px;
      font-size: 14px; font-weight: 600; cursor: pointer;
      font-family: inherit; border: none; transition: opacity .15s;
      &:hover { opacity: 0.85; }
      &:disabled { opacity: 0.45; cursor: not-allowed; }
    }
    .btn__cancel { background: #F5F5F5; color: #555; }
    .btn__submit { background: #FC5353; color: #fff; }
  }

  .success__state {
    text-align: center; padding: 20px 0;
    .check { font-size: 48px; margin-bottom: 12px; }
    h4 { font-size: 17px; font-weight: 700; color: #212121; margin: 0 0 6px; }
    p { font-size: 13px; color: #9E9E9E; margin: 0 0 20px; }
    button {
      background: #FC5353; color: #fff; border: none;
      border-radius: 8px; padding: 10px 24px;
      font-size: 14px; font-weight: 600; cursor: pointer;
      font-family: inherit;
    }
  }
`;

const REASONS = [
  { value: '', label: 'Select a reason…' },
  { value: 'defective',        label: 'Defective / Not working' },
  { value: 'wrong_item',       label: 'Wrong item received' },
  { value: 'not_as_described', label: 'Not as described' },
  { value: 'damaged',          label: 'Item arrived damaged' },
  { value: 'other',            label: 'Other' },
];

export default function ReturnRequestModal({ orderId, onClose }) {
  const qc = useQueryClient();
  const [reason, setReason] = useState('');
  const [detail, setDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { mutate, isLoading } = useSubmitReturn({
    onSuccess: () => {
      qc.invalidateQueries(['my-returns']);
      setSubmitted(true);
    },
    onError: (err) => {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    },
  });

  const handleSubmit = () => {
    setError('');
    if (!reason) { setError('Please select a reason.'); return; }
    mutate({ orderId, reason, reasonDetail: detail });
  };

  return (
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <Modal>
        <button className="close__btn" onClick={onClose}>×</button>

        {submitted ? (
          <div className="success__state">
            <div className="check">✅</div>
            <h4>Return Request Submitted</h4>
            <p>
              Your request is under review. We&apos;ll update you by email once a decision is made.
              You can track its status in <strong>My Returns</strong>.
            </p>
            <button onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h3>Request a Return</h3>
            <p className="subtitle">Order #{String(orderId).slice(-8).toUpperCase()}</p>

            <div className="note__box">
              <b>Please note:</b> Returns must be requested within the eligible window.
              Return shipping costs are the buyer&apos;s responsibility.
              Our team will review your request and respond within 2–3 business days.
            </div>

            <div className="field">
              <label>Reason for Return</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                {REASONS.map((r) => (
                  <option key={r.value} value={r.value} disabled={!r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Additional Details <span style={{ color: '#BBBBBB', fontWeight: 400 }}>(optional)</span></label>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value.slice(0, 500))}
                placeholder="Describe the issue in more detail…"
              />
              <p className="char__count">{detail.length}/500</p>
            </div>

            {error && (
              <p style={{ color: '#FC5353', fontSize: 13, marginBottom: 12, margin: '0 0 12px' }}>
                {error}
              </p>
            )}

            <div className="actions">
              <button className="btn__cancel" onClick={onClose} disabled={isLoading}>Cancel</button>
              <button className="btn__submit" onClick={handleSubmit} disabled={isLoading || !reason}>
                {isLoading ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>
          </>
        )}
      </Modal>
    </Overlay>
  );
}
