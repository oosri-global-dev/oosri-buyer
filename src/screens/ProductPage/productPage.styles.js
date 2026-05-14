import styled from "styled-components";

export const ProductBreadcrumbsWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 14px 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;

  .crumb__link {
    color: #888;
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.12s;
    &:hover { color: var(--orrsiPrimary); }
  }

  .crumb__sep {
    color: #ccc;
    font-size: 0.8rem;
  }

  .crumb__current {
    color: #1a1a1a;
    font-size: 0.85rem;
    font-weight: 500;
    /* truncate long product names */
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 440px) { max-width: 140px; }
  }
`;

export const ProductPageWrapper = styled.div`
  width: 100%;
  padding-bottom: 72px;

  /* ── 2-column layout ── */
  .pdp__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;

    @media (max-width: 860px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  /* ── Gallery ── */
  .pdp__gallery {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: sticky;
    top: 20px;

    @media (max-width: 860px) {
      position: static;
    }
  }

  .pdp__main__image {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    background: #f8f8f8;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #f0f0f0;

    .no__image__box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #bbb;
      font-size: 0.85rem;
    }
  }

  .pdp__thumbs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  .pdp__thumb {
    position: relative;
    flex: 0 0 auto;
    width: 72px;
    height: 72px;
    border-radius: 10px;
    border: 2px solid #e8e8e8;
    background: #f8f8f8;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    transition: border-color 0.12s;

    &:hover { border-color: #ccc; }
    &.active { border-color: var(--orrsiPrimary); }
  }

  /* ── Info panel ── */
  .pdp__info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .pdp__brand {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--orrsiPrimary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 8px;
  }

  .pdp__name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.35;
    margin: 0 0 14px;

    @media (max-width: 480px) { font-size: 1.25rem; }
  }

  .pdp__rating__row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;

    .star__row {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .pdp__rating__score {
      font-size: 0.88rem;
      font-weight: 700;
      color: #1a1a1a;
    }

    .pdp__review__link {
      font-size: 0.82rem;
      color: #888;
      text-decoration: underline;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .pdp__purchases {
      font-size: 0.78rem;
      color: #aaa;
      &::before { content: "·"; margin-right: 6px; }
    }
  }

  .pdp__divider {
    height: 1px;
    background: #f0f0f0;
    margin: 14px 0;
  }

  /* ── Price ── */
  .pdp__price__block {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }

  .pdp__price {
    font-size: 1.85rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1;
  }

  .pdp__original__price {
    font-size: 1rem;
    color: #bbb;
    text-decoration: line-through;
  }

  .pdp__discount__badge {
    background: #fff1f0;
    color: var(--orrsiPrimary);
    font-size: 0.8rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid rgba(252, 83, 83, 0.2);
  }

  /* ── Delivery ── */
  .pdp__delivery__row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: #444;
    margin-bottom: 4px;

    strong { color: #1a1a1a; }
  }

  /* ── Quantity ── */
  .pdp__qty__row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 4px;
  }

  .pdp__qty__label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #555;
    white-space: nowrap;
  }

  .pdp__qty__control {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    height: 40px;
  }

  .pdp__qty__btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #444;
    transition: background 0.1s;
    flex-shrink: 0;

    &:hover:not(:disabled) { background: #f5f5f5; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  }

  .pdp__qty__value {
    min-width: 44px;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 700;
    color: #1a1a1a;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── CTA buttons ── */
  .pdp__ctas {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 4px;
  }

  .pdp__wishlist__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 42px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    color: #555;
    border-radius: 12px;
    transition: color 0.12s, background 0.12s;

    &:hover { background: #fdf1f1; color: var(--orrsiPrimary); }
    &.saved { color: var(--orrsiPrimary); }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  /* ── Trust badges ── */
  .pdp__trust {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding: 12px 0 4px;
    border-top: 1px solid #f0f0f0;
  }

  .trust__badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: #777;
    font-weight: 500;
  }

  /* ── Tabs ── */
  .pdp__tabs {
    margin-top: 48px;
    border-top: 2px solid #f0f0f0;
  }

  .pdp__tab__bar {
    display: flex;
    gap: 0;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 24px;
  }

  .pdp__tab {
    padding: 14px 24px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #888;
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: color 0.12s, border-color 0.12s;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover { color: #1a1a1a; }
    &.active {
      color: var(--orrsiPrimary);
      border-bottom-color: var(--orrsiPrimary);
    }

    @media (max-width: 440px) { padding: 12px 16px; font-size: 0.85rem; }
  }

  .tab__count__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fedddd;
    color: var(--orrsiPrimary);
    font-size: 0.72rem;
    font-weight: 700;
    min-width: 22px;
    height: 20px;
    padding: 0 6px;
    border-radius: 20px;
  }

  .pdp__tab__content {
    min-height: 120px;
  }

  /* ── Related products ── */
  .pdp__related {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 2px solid #f0f0f0;
  }

  /* ── Review cards (scoped inside page wrapper) ── */
  .reviews__list {
    display: flex;
    flex-direction: column;
  }

  .review__card {
    padding: 20px 0;
    border-bottom: 1px solid #f5f5f5;
    &:last-of-type { border-bottom: none; }
  }

  .review__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .reviewer__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff9a9a 100%);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .reviewer__meta {
    flex: 1;
    p { margin: 0; }
  }

  .reviewer__name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 3px;
  }

  .reviewer__stars {
    display: flex;
    gap: 2px;
  }

  .review__date {
    font-size: 0.75rem;
    color: #aaa;
    white-space: nowrap;
    margin-left: auto;
  }

  .review__text {
    font-size: 0.875rem;
    color: #444;
    line-height: 1.6;
    margin: 0;
  }

  .reviews__empty {
    padding: 32px 0;
    p { font-size: 0.9rem; color: #888; margin: 0; }
  }

  .see__all__btn {
    display: inline-flex;
    align-items: center;
    margin-top: 16px;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--orrsiPrimary);
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;
    &:hover { background: #fff5f5; border-color: var(--orrsiPrimary); }
  }
`;
