import styled from "styled-components";

export const SCProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .product__image__wrapper {
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    background: #f8f8f8;
    cursor: pointer;

    &:hover img {
      transform: scale(1.05);
    }

    img {
      transition: transform 0.3s ease;
    }
  }

  .product__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;

    .product__name {
      font-size: 0.95rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .remove__box {
      display: flex;
      gap: 5px;
      align-items: center;
      cursor: pointer;
      width: fit-content;

      p {
        color: var(--orrsiPrimary);
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        margin: 0;
      }

      &:hover p {
        text-decoration: underline;
      }
    }
  }

  .qty__controls {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;

    .qty__btn {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1rem;
      color: #444;
      background: transparent;
      border: none;
      user-select: none;
      transition: background 0.15s ease, color 0.15s ease;
      flex-shrink: 0;

      &:hover:not(.disabled) {
        background: #f5f5f5;
        color: var(--orrsiPrimary);
      }

      &.disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

    .qty__count {
      min-width: 32px;
      text-align: center;
      font-size: 0.88rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      height: 34px;
      line-height: 34px;
    }
  }

  .price__block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
    min-width: 80px;

    .line__total {
      font-size: 1rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }

    .unit__price {
      font-size: 0.78rem;
      color: #aaa;
      margin: 0;
    }

    .unit__original {
      font-size: 0.75rem;
      color: #ccc;
      text-decoration: line-through;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr auto;
    grid-template-rows: auto auto;

    .product__image__wrapper {
      width: 80px;
      height: 80px;
      grid-row: 1 / 3;
    }

    .product__info {
      grid-column: 2;
      grid-row: 1;
    }

    .qty__controls {
      grid-column: 2;
      grid-row: 2;
      justify-self: start;
    }

    .price__block {
      grid-column: 3;
      grid-row: 1 / 3;
      justify-self: end;
      align-self: center;
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: 72px 1fr;
    gap: 14px;

    .product__image__wrapper {
      width: 72px;
      height: 72px;
      grid-row: 1;
    }

    .product__info {
      grid-column: 2;
      grid-row: 1;
    }

    .qty__controls {
      grid-column: 1 / 3;
      grid-row: 2;
    }

    .price__block {
      grid-column: 1 / 3;
      grid-row: 3;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      .line__total {
        font-size: 1rem;
      }
    }
  }
`;
