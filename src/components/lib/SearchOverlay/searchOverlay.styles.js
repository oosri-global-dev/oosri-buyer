import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

export const SearchBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  z-index: 999;
`;

export const SearchOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(680px, 100vw);
  max-height: 85vh;
  background: #fff;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideDown} 0.18s ease;

  /* ── Input row ── */
  .so__input__row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-bottom: 1px solid #f0f0f0;
    flex-shrink: 0;
  }

  .so__search__icon {
    color: #aaa;
    flex-shrink: 0;
  }

  .so__input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #1a1a1a;
    background: transparent;
    min-width: 0;

    &::placeholder { color: #bbb; }
  }

  .so__clear__btn,
  .so__close__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.1s, color 0.1s;
    flex-shrink: 0;

    &:hover { background: #f5f5f5; color: #1a1a1a; }
  }

  .so__close__btn {
    width: 30px;
    height: 30px;
    border: 1px solid #e8e8e8;
    border-radius: 50%;
    margin-left: 4px;
  }

  /* ── Scrollable body ── */
  .so__body {
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: #e0e0e0 transparent;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
  }

  /* ── Section ── */
  .so__section {
    padding: 12px 16px 4px;
  }

  .so__section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;

    span {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #aaa;
    }
  }

  .so__clear__link {
    background: none;
    border: none;
    font-size: 0.78rem;
    color: var(--orrsiPrimary);
    cursor: pointer;
    padding: 0;

    &:hover { text-decoration: underline; }
  }

  /* ── Recent searches ── */
  .so__recent__list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .so__recent__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 9px 8px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    text-align: left;
    font-size: 0.88rem;
    color: #333;
    transition: background 0.1s;

    &:hover { background: #f8f8f8; }

    .so__history__icon { color: #bbb; flex-shrink: 0; }

    span { flex: 1; }
  }

  /* ── Product rows ── */
  .so__product__row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    text-align: left;
    transition: background 0.1s;

    &:hover { background: #fdf5f5; }
  }

  .so__product__img {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: #f8f8f8;
    border: 1px solid #f0f0f0;
    flex-shrink: 0;
    overflow: hidden;
  }

  .so__product__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .so__product__name {
    font-size: 0.875rem;
    color: #1a1a1a;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .so__product__price {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--orrsiPrimary);
  }

  /* ── Category rows ── */
  .so__category__row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 9px 8px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    text-align: left;
    font-size: 0.875rem;
    color: #333;
    transition: background 0.1s;

    &:hover { background: #f8f8f8; }

    .so__cat__icon { color: #aaa; flex-shrink: 0; }

    span:nth-child(2) { flex: 1; }

    .so__cat__arrow {
      color: #bbb;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
  }

  /* ── See all footer ── */
  .so__see__all {
    padding: 12px 16px;
    border-top: 1px solid #f5f5f5;
    margin-top: 4px;

    button {
      width: 100%;
      padding: 11px 16px;
      background: #fdf5f5;
      border: 1px solid rgba(252, 83, 83, 0.2);
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.875rem;
      color: #555;
      text-align: left;
      transition: background 0.12s, border-color 0.12s;

      strong { color: var(--orrsiPrimary); }

      &:hover { background: #fff0f0; border-color: var(--orrsiPrimary); }
    }
  }

  /* ── Skeleton ── */
  .so__product__skeleton {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
  }

  .so__skel__img {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
    flex-shrink: 0;
  }

  .so__skel__lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .so__skel__line {
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Empty state ── */
  .so__empty {
    font-size: 0.875rem;
    color: #aaa;
    padding: 12px 8px;
    margin: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 520px) {
    border-radius: 0 0 12px 12px;

    .so__input__row { padding: 12px; }
    .so__input { font-size: 0.95rem; }
  }
`;
