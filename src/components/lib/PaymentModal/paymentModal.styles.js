import styled from "styled-components";
import { Modal } from "antd";
import { FlexibleDiv } from "../Box/styles";

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
    box-sizing: border-box;
  }

  .ant-modal-header {
    background: linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff6b6b 100%);
    padding: 20px 24px;
    margin: 0;
    border: none;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;

    .ant-modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .ant-modal-close {
    color: #fff;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(90deg);
    }

    .ant-modal-close-x {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .ant-modal-body {
    padding: 24px;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    width: 95% !important;
    margin: 20px auto;

    .ant-modal-content {
      border-radius: 16px;
    }

    .ant-modal-header {
      border-radius: 16px 16px 0 0;
      padding: 20px;

      .ant-modal-title {
        font-size: 1.3rem;
      }
    }

    .ant-modal-body {
      padding: 20px;
    }
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

  .section__title {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;

    svg {
      flex-shrink: 0;
    }
  }

  .address__section {
    padding: 16px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
    border-radius: 12px;
    border: 2px solid #f0f0f0;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;

    .section__title {
      margin-bottom: 16px;
    }

    .address__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;

      .address__card {
        width: 100%;
        border: 2px solid #e8e8e8;
        border-radius: 10px;
        padding: 12px 16px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: transparent;
          transition: all 0.3s ease;
        }

        &:hover {
          border-color: var(--orrsiPrimary);
          box-shadow: 0 4px 16px rgba(252, 83, 83, 0.15);
          transform: translateY(-2px);

          &::before {
            background: linear-gradient(
              135deg,
              var(--orrsiPrimary) 0%,
              #ff6b6b 100%
            );
          }
        }

        &.selected {
          border-color: var(--orrsiPrimary);
          background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
          box-shadow: 0 4px 20px rgba(252, 83, 83, 0.25);
          transform: translateY(-2px);

          &::before {
            background: linear-gradient(
              135deg,
              var(--orrsiPrimary) 0%,
              #ff6b6b 100%
            );
          }

          &::after {
            content: "✓";
            position: absolute;
            top: 10px;
            right: 10px;
            width: 22px;
            height: 22px;
            background: linear-gradient(
              135deg,
              var(--orrsiPrimary) 0%,
              #ff6b6b 100%
            );
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(252, 83, 83, 0.4);
            animation: checkmarkPop 0.3s ease;
          }
        }

        .address__text {
          font-size: 0.9rem;
          font-weight: 500;
          color: #333;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .address__details {
          font-size: 0.8rem;
          color: #666;
          margin: 0 0 2px 0;
          line-height: 1.4;
          display: flex;
          align-items: center;
          gap: 4px;

          &:last-child {
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
          transition: all 0.2s ease;
          color: #777;

          &:hover {
            background-color: #f5f5f5;
            color: #333;
          }

          &.delete__btn {
            &:hover {
              background-color: #fff1f0;
              color: #ff4d4f;
            }
          }

          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          svg {
            display: block;
          }
        }
      }
    }

    .no__address__text {
      color: #666;
      font-size: 0.9rem;
      text-align: center;
      padding: 30px 16px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 10px;
      margin: 0;
      border: 2px dashed #dee2e6;
      position: relative;
      font-weight: 500;
      box-sizing: border-box;
    }
  }

  @keyframes checkmarkPop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .address__form__section {
    padding: 16px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
    border-radius: 12px;
    border: 2px solid #f0f0f0;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;

    .section__title {
      margin-bottom: 16px;
    }

    .cancel__edit__btn {
      background: transparent;
      border: none;
      color: #777;
      cursor: pointer;
      font-size: 0.9rem;
      padding: 6px 12px;
      border-radius: 6px;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f5f5f5;
        color: #333;
      }
    }

    .form__field__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      .input__label {
        font-size: 0.85rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 6px;
        display: block;
      }

      .address__textarea {
        width: 100% !important;
        border-radius: 10px;
        border: 2px solid #e8e8e8;
        padding: 10px 12px;
        resize: vertical;
        min-height: 80px;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        box-sizing: border-box;

        &:focus,
        &:focus-within,
        &:hover {
          border-color: var(--orrsiPrimary);
          box-shadow: 0 0 0 3px rgba(252, 83, 83, 0.1);
        }
      }

      .move__down {
        margin-bottom: 0;
      }

      .country__select {
        width: 100%;
        height: 45px;
        box-sizing: border-box;

        .ant-select-selector {
          border-radius: 10px !important;
          border: 2px solid #e8e8e8 !important;
          height: 45px !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;

          &:hover {
            border-color: var(--orrsiPrimary) !important;
          }
        }

        &.ant-select-focused .ant-select-selector {
          border-color: var(--orrsiPrimary) !important;
          box-shadow: 0 0 0 3px rgba(252, 83, 83, 0.1) !important;
        }
      }
    }

    .max__address__warning {
      color: #ff4d4f;
      font-size: 0.85rem;
      margin: 8px 0 0 0;
      text-align: center;
    }
  }

  .payment__summary {
    padding: 16px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
    border-radius: 12px;
    border: 2px solid #f0f0f0;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;

    .section__title {
      margin-bottom: 16px;
    }

    .summary__details {
      background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
      padding: 16px;
      border-radius: 10px;
      box-sizing: border-box;
      border: 1px solid #e8e8e8;

      .summary__label {
        font-size: 0.9rem;
        color: #666;
        margin: 0;
        font-weight: 500;
      }

      .summary__value {
        font-size: 0.9rem;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      .total__row {
        border-top: 2px solid #e8e8e8;
        padding: 12px 16px;
        margin-top: 6px;
        background: linear-gradient(
          135deg,
          rgba(252, 83, 83, 0.05) 0%,
          rgba(255, 107, 107, 0.05) 100%
        );
        border-radius: 0 0 10px 10px;
        box-sizing: border-box;

        .total__label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
        }

        .total__value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--orrsiPrimary);
        }
      }
    }
  }

  .complete__payment__btn {
    font-weight: 600 !important;
    box-sizing: border-box;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(252, 83, 83, 0.4) !important;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    .address__section {
      padding: 16px;

      .address__list {
        .address__card {
          padding: 10px 14px;
        }
      }
    }

    .address__form__section {
      padding: 16px;
    }

    .payment__summary {
      padding: 16px;
    }

    .section__title {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
  }
`;
