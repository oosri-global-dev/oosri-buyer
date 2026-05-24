import styled from "styled-components";
import { Modal } from "antd";

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.14);
    background: #fff;
    box-sizing: border-box;
  }

  .ant-modal-header {
    background: #fff;
    padding: 20px 28px 18px;
    margin: 0;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 12px 12px 0 0;
    box-sizing: border-box;

    .ant-modal-title {
      font-size: 1rem;
      font-weight: 600;
      color: #111;
      letter-spacing: -0.01em;
    }
  }

  .ant-modal-close {
    color: #bbb;
    top: 20px;
    right: 24px;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: transparent;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #f5f5f5;
      color: #555;
    }

    .ant-modal-close-x {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .ant-modal-body {
    padding: 24px 28px 28px;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    width: 95% !important;
    margin: 10px auto;

    .ant-modal-content { border-radius: 10px; }

    .ant-modal-header {
      border-radius: 10px 10px 0 0;
      padding: 16px 20px 14px;
    }

    .ant-modal-body { padding: 20px 20px 24px; }
  }
`;

export const PaymentModalContent = styled.div`
  box-sizing: border-box;
  width: 100%;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* ─── Section Title — text + extending rule ─── */
  .section__title {
    font-size: 0.88rem;
    font-weight: 600;
    color: #111;
    margin: 0 0 14px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
    letter-spacing: -0.01em;
    white-space: nowrap;

    &::after {
      content: "";
      display: block;
      flex: 1;
      height: 1px;
      background: #ebebeb;
      min-width: 12px;
    }

    svg {
      flex-shrink: 0;
      color: #aaa;
    }
  }

  /* ─── Delivery Address ─── */
  .address__section {
    width: 100%;

    .address__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;

      .address__card {
        width: 100%;
        border: 1.5px solid #e8e8e8;
        border-radius: 10px;
        padding: 13px 14px 13px 42px;
        cursor: pointer;
        transition: border-color 0.15s, background 0.15s;
        background: #fff;
        position: relative;

        /* Radio circle */
        &::before {
          content: "";
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #d0d0d0;
          background: #fff;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
        }

        &:hover {
          border-color: var(--orrsiPrimary);

          &::before {
            border-color: var(--orrsiPrimary);
          }
        }

        &.selected {
          border-color: var(--orrsiPrimary);
          border-left-width: 3px;
          background: #fff8f8;

          &::before {
            border-color: var(--orrsiPrimary);
            background: var(--orrsiPrimary);
            box-shadow: inset 0 0 0 3px #fff;
          }
        }

        .address__text {
          font-size: 0.88rem;
          font-weight: 500;
          color: #111;
          margin: 0 0 3px 0;
          line-height: 1.35;
        }

        .address__details {
          font-size: 0.78rem;
          color: #777;
          margin: 0 0 2px 0;
          line-height: 1.4;

          &:last-of-type {
            margin-bottom: 0;
          }
        }

        .icon__button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.12s, color 0.12s;
          color: #ccc;

          &:hover {
            background: #f5f5f5;
            color: #444;
          }

          &.delete__btn:hover {
            background: #fff1f0;
            color: #ff4d4f;
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          svg {
            display: block;
          }
        }
      }
    }

    .no__address__text {
      color: #888;
      font-size: 0.85rem;
      text-align: center;
      padding: 22px 16px;
      background: #fafafa;
      border-radius: 8px;
      margin: 0;
      border: 1.5px dashed #e0e0e0;
    }
  }

  /* ─── Address Tag ─── */
  .address__tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 4px;
    margin-top: 5px;

    &.paystack__tag {
      background: #e6f9ef;
      color: #00703c;
      border: 1px solid #b3e8cc;
    }

    &.stripe__tag {
      background: #eef2ff;
      color: #4f46e5;
      border: 1px solid #c7d2fe;
    }
  }

  /* ─── Address Form ─── */
  .address__form__section {
    width: 100%;

    .cancel__edit__btn {
      background: transparent;
      border: none;
      color: #888;
      cursor: pointer;
      font-size: 0.82rem;
      padding: 6px 10px;
      border-radius: 6px;
      transition: background 0.12s, color 0.12s;
      white-space: nowrap;

      &:hover {
        background: #f5f5f5;
        color: #333;
      }
    }

    .form__field__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;

      .input__label {
        font-size: 0.72rem;
        font-weight: 700;
        color: #777;
        margin-bottom: 5px;
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .address__autocomplete {
        position: relative;
        width: 100%;
      }

      .address__input {
        width: 100%;
        height: 44px;
        border-radius: 8px;
        border: 1.5px solid #e0e0e0;
        transition: border-color 0.15s;
        font-size: 0.88rem;

        &:hover,
        &:focus,
        &.ant-input-focused,
        &:focus-within {
          border-color: var(--orrsiPrimary);
          box-shadow: none;
        }

        &.has__error {
          border-color: #ff4d4f;
        }
      }

      .address__suggestions {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 20;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 6px;
        border-radius: 8px;
        border: 1px solid #e8e8e8;
        background: #fff;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        max-height: 240px;
        overflow-y: auto;
      }

      .address__suggestion {
        width: 100%;
        border: none;
        border-radius: 6px;
        background: transparent;
        padding: 9px 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
        text-align: left;
        cursor: pointer;
        transition: background 0.1s;

        &:hover {
          background: #fafafa;
        }
      }

      .address__suggestion__primary {
        font-size: 0.88rem;
        font-weight: 500;
        color: #222;
      }

      .address__suggestion__secondary {
        font-size: 0.78rem;
        color: #888;
      }

      .address__helper__text {
        margin: 6px 0 0;
        color: #777;
        font-size: 0.78rem;
        line-height: 1.5;
      }

      .address__error__text {
        margin: 6px 0 0;
        color: #ff4d4f;
        font-size: 0.78rem;
      }

      .country__select {
        width: 100%;
        height: 44px;

        .ant-select-selector {
          border-radius: 8px !important;
          border: 1.5px solid #e0e0e0 !important;
          height: 44px !important;
          transition: border-color 0.15s !important;

          &:hover {
            border-color: var(--orrsiPrimary) !important;
          }
        }

        &.ant-select-focused .ant-select-selector {
          border-color: var(--orrsiPrimary) !important;
          box-shadow: none !important;
        }
      }
    }

    .max__address__warning {
      color: #ff4d4f;
      font-size: 0.8rem;
      margin: 6px 0 0 0;
    }
  }

  /* ─── Payment Gateway Banner ─── */
  .gateway__banner {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 11px 16px;
    border-radius: 8px;
    border: 1px solid;
    border-left-width: 3px;

    &.paystack {
      background: #f6fef9;
      border-color: #b3e8cc;
      border-left-color: #00b14f;

      .gateway__icon {
        color: #00703c;
      }
    }

    &.stripe {
      background: #f5f7ff;
      border-color: #c7d2fe;
      border-left-color: #635bff;

      .gateway__icon {
        color: #635bff;
      }
    }

    .gateway__icon {
      line-height: 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    .gateway__info {
      flex: 1;

      .gateway__name {
        font-size: 0.85rem;
        font-weight: 600;
        margin: 0 0 1px;
        color: #111;
      }

      .gateway__desc {
        font-size: 0.75rem;
        color: #666;
        margin: 0;
        line-height: 1.3;
      }
    }

    .gateway__badge {
      font-size: 0.67rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      background: #fff;
      color: #555;
      border: 1px solid #ddd;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      flex-shrink: 0;
    }
  }

  /* ─── Shipping Compact ─── */
  .shipping__details__compact {
    width: 100%;

    .shipping__badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 11px;
      background: #fafafa;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: 500;
      color: #444;
      border: 1px solid #e2e2e2;
      white-space: nowrap;
    }
  }

  .shipping__service__description {
    margin: 8px 0 0;
    font-size: 0.8rem;
    line-height: 1.45;
    color: #666;
  }

  /* ─── Shipping Service Selection ─── */
  .shipping__service__section {
    width: 100%;

    .shipping__service__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .shipping__service__card {
      width: 100%;
      text-align: left;
      border: 1.5px solid #e8e8e8;
      border-radius: 8px;
      padding: 12px 14px;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      color: inherit;

      &:hover {
        border-color: var(--orrsiPrimary);
      }

      &.selected {
        border-color: var(--orrsiPrimary);
        border-left-width: 3px;
        background: #fff8f8;
      }
    }

    .shipping__service__name {
      margin: 0;
      font-size: 0.88rem;
      font-weight: 600;
      color: #222;
    }

    .shipping__service__price {
      margin: 0;
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--orrsiPrimary);
    }

    .shipping__service__description {
      margin: 5px 0 8px;
      font-size: 0.79rem;
      line-height: 1.4;
      color: #666;
    }

    .shipping__service__features {
      margin-top: 4px;
    }

    .shipping__service__feature {
      padding: 3px 8px;
      border: 1px solid #ebebeb;
      border-radius: 4px;
      background: #fafafa;
      font-size: 0.73rem;
      color: #555;
    }
  }

  /* ─── Order Summary ─── */
  .payment__summary {
    width: 100%;
    background: #f7f8fa;
    border-radius: 10px;
    padding: 18px 20px;
    border: 1px solid #ebebeb;

    .order__items {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px solid #e4e4e4;

      .order__item {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .order__item__img {
        width: 42px;
        height: 42px;
        border-radius: 6px;
        object-fit: cover;
        flex-shrink: 0;
        border: 1px solid #e8e8e8;
      }

      .order__item__img__placeholder {
        width: 42px;
        height: 42px;
        border-radius: 6px;
        background: #e8e8e8;
        flex-shrink: 0;
      }

      .order__item__info {
        flex: 1;
        min-width: 0;

        .order__item__name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order__item__meta {
          font-size: 0.77rem;
          color: #999;
          margin: 0;
        }
      }

      .order__item__price {
        font-size: 0.84rem;
        font-weight: 700;
        color: #333;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }

    .summary__details {
      .summary__label {
        font-size: 0.85rem;
        color: #666;
        margin: 0;
      }

      .summary__value {
        font-size: 0.85rem;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      .total__row {
        border-top: 1.5px solid #dfe1e4;
        padding-top: 12px;
        margin-top: 8px;

        .total__label {
          font-size: 0.95rem;
          font-weight: 700;
          color: #111;
        }

        .total__value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--orrsiPrimary);
        }
      }
    }
  }

  /* ─── Pay Button + Security Note ─── */
  .pay__button__wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .payment__secure__note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 0.72rem;
    color: #bbb;
    margin: 0;

    svg {
      flex-shrink: 0;
    }
  }

  .calculating__loader {
    font-size: 0.84rem;
    color: #999;
  }

  .complete__payment__btn {
    font-weight: 600 !important;
    letter-spacing: 0.01em;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 7px !important;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.65;
    }
  }

  @media (max-width: 768px) {
    .address__section .address__list .address__card {
      padding: 11px 12px 11px 38px;
    }

    .payment__summary {
      padding: 16px;
    }

    .shipping__details__compact .shipping__badge {
      font-size: 0.78rem;
    }

    .section__title {
      font-size: 0.82rem;
    }
  }
`;
