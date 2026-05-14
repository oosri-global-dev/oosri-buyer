import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const AddressBookWrapper = styled(FlexibleDiv)`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  flex-basis: 100%;

  .top__nav {
    margin-bottom: 24px;
    padding: 0 10px;
    box-sizing: border-box;

    .left__section {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      color: #555;

      &:hover {
        color: var(--orrsiPrimary);
        svg { color: var(--orrsiPrimary); }
      }
    }
  }

  .section__heading {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 16px 0;
    padding: 0 10px;
  }

  .address__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .address__card {
    border: 1.5px solid #eee;
    border-radius: 14px;
    padding: 14px 16px;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #fff;

    &:hover {
      border-color: var(--orrsiPrimary);
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }

    &.default__card {
      border-color: var(--orrsiPrimary);
      background: rgba(254, 221, 221, 0.06);
    }

    .address__text {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0 0 3px 0;
    }

    .address__details {
      font-size: 0.8rem;
      color: #777;
      margin: 0;
    }

    .default__badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--orrsiPrimary);
      background: rgba(254, 83, 83, 0.08);
      border-radius: 20px;
      padding: 2px 8px;
      margin-top: 6px;
    }

    .payment__tag {
      display: inline-block;
      font-size: 0.72rem;
      color: #666;
      background: #f5f5f5;
      border-radius: 20px;
      padding: 2px 8px;
      margin-top: 4px;
    }
  }

  .icon__button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 6px;
    color: #888;
    display: flex;
    align-items: center;
    transition: background 0.15s, color 0.15s;

    &:hover { background: #f5f5f5; color: #333; }
    &.delete__btn:hover { background: #fff0f0; color: var(--orrsiPrimary); }
    &.star__btn.active { color: #f5a623; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  }

  .empty__text {
    font-size: 0.88rem;
    color: #999;
    padding: 0 10px;
    margin: 0 0 16px 0;
  }

  .add__btn__row {
    padding: 0 10px;
    margin-top: 4px;
  }

  .address__form__section {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 16px;
  }

  .form__section__title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cancel__btn {
      background: none;
      border: none;
      font-size: 0.82rem;
      color: #888;
      cursor: pointer;
      &:hover { color: var(--orrsiPrimary); }
    }
  }

  .form__field__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .input__label {
      font-size: 0.85rem;
      color: #555;
      margin-bottom: 4px;
    }

    .ant-form-item { margin-bottom: 0; }
  }

  .country__select {
    width: 100%;
    .ant-select-selector {
      border-radius: 10px !important;
      height: 42px !important;
      align-items: center !important;
    }
  }

  .max__warning {
    font-size: 0.78rem;
    color: #999;
    margin: 6px 0 0 0;
  }

  @media (max-width: 550px) {
    margin-top: 16px;
  }
`;
