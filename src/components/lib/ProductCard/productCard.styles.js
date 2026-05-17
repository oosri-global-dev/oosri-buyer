import styled from "styled-components";

export const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: default;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);

    .card__image img {
      transform: scale(1.04);
    }
  }

  /* ── Image area ── */
  .card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #f8f8f8;
    cursor: pointer;
    flex-shrink: 0;

    img {
      transition: transform 0.35s ease;
    }

    .no__image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      color: #bbb;
    }

    /* Heart button */
    .heart__btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
      transition: background 0.15s ease, transform 0.15s ease;
      color: #bbb;

      &:hover {
        background: #fff;
        transform: scale(1.1);
      }

      &.active {
        color: var(--orrsiPrimary);
      }
    }

    /* Discount badge */
    .discount__badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: var(--orrsiPrimary);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      z-index: 2;
    }
  }

  /* ── Info ── */
  .card__body {
    padding: 12px 12px 8px;
    flex: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .card__brand {
      font-size: 0.72rem;
      color: #aaa;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card__name {
      font-size: 0.88rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }

    .card__rating {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-top: 2px;

      .rating__num {
        font-size: 0.72rem;
        color: #aaa;
        margin-left: 3px;
      }
    }

    .card__price__row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;

      .card__price {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1a1a1a;
      }

      .card__original__price {
        font-size: 0.78rem;
        color: #bbb;
        text-decoration: line-through;
      }
    }
  }

  /* ── Action buttons ── */
  .card__actions {
    display: flex;
    gap: 8px;
    padding: 8px 12px 12px;

    .add-to-cart-btn,
    .remove-from-cart-btn {
      transition: all 0.2s ease;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 5px;
      padding: 6px 8px 10px;

      button {
        height: 34px !important;
        min-height: 34px !important;
        font-size: 0.76rem !important;
        padding: 0 8px !important;
      }

      button span {
        font-size: 0.76rem !important;
      }
    }
  }

  @media (max-width: 600px) {
    .card__body {
      padding: 8px 8px 6px;
      gap: 3px;

      .card__name {
        font-size: 0.82rem;
      }

      .card__price__row .card__price {
        font-size: 0.88rem;
      }
    }
  }

  /* Loading card (skeleton) keeps consistent sizing */
  &.loading {
    pointer-events: none;
  }
`;
