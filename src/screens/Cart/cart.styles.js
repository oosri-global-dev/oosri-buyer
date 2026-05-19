import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const CartPageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  box-sizing: border-box;

  /* ── Page header ── */
  .cart__header {
    margin-bottom: 28px;

    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 4px 0;
    }

    .cart__item__count {
      font-size: 0.9rem;
      color: #888;
      margin: 0;
    }
  }

  /* ── Two-column grid ── */
  .cart__grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 32px;
    align-items: start;
  }

  /* ── Left: items panel ── */
  .cart__items__panel {
    background: #fff;
    border: 1px solid #efefef;
    border-radius: 16px;
    padding: 8px 24px 0;
  }

  /* ── Right: summary card ── */
  .cart__summary__card {
    background: #fff;
    border: 1px solid #efefef;
    border-radius: 16px;
    padding: 24px;
    position: sticky;
    top: 100px;

    .summary__title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 20px 0;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .summary__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .summary__label {
        font-size: 0.9rem;
        color: #666;
        margin: 0;
      }

      .summary__value {
        font-size: 0.9rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
      }

      .summary__note {
        font-size: 0.82rem;
        color: #aaa;
        margin: 0;
      }
    }

    .summary__divider {
      border: none;
      border-top: 1px solid #f0f0f0;
      margin: 16px 0;
    }

    .summary__total__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .total__label {
        font-size: 1rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      .total__value {
        font-size: 1.15rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }
    }

    .checkout__cta {
      width: 100%;
      height: 50px;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
    }

    .continue__shopping {
      display: block;
      text-align: center;
      margin-top: 14px;
      font-size: 0.85rem;
      color: #888;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: var(--orrsiPrimary);
      }
    }

    .secure__badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 16px;
      font-size: 0.78rem;
      color: #bbb;
    }
  }

  /* ── Empty cart ── */
  .empty__cart__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 420px;
    gap: 20px;
    padding: 60px 24px;

    .icon__wrapper {
      width: 120px;
      height: 120px;
      background: #fafafa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty__title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
      text-align: center;
    }

    .empty__subtitle {
      font-size: 0.9rem;
      color: #888;
      margin: 0;
      text-align: center;
    }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .cart__grid {
      grid-template-columns: 1fr;
    }

    .cart__summary__card {
      position: static;
    }
  }

  @media (max-width: 550px) {
    padding: 20px 16px 60px;

    .cart__header h1 {
      font-size: 1.3rem;
    }

    .cart__items__panel {
      padding: 8px 16px 0;
    }
  }
`;
