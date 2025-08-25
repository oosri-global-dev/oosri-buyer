import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ShopPageWrapper = styled(FlexibleDiv)`
  position: relative;

  hr {
    border: 0.4px solid #f5f5f5;
    width: 100%;
  }

  .products__section {
    margin-top: 25px;
    box-sizing: border-box;

    .filter__box {
      width: 25%;
      height: auto;
      border-radius: 15px;
      border: 1px solid #ccc;
      min-width: 270px;
      padding: 10px 14px;
      box-sizing: border-box;

      .category__filters {
        width: 100%;
        .custom__checkbox__group {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .ant-checkbox-wrapper-checked .ant-checkbox-inner {
            background-color: var(--orrsiPrimary);
            border-color: var(--orrsiPrimary);
          }
          .ant-checkbox-wrapper:hover .ant-checkbox-inner,
          .ant-checkbox:hover .ant-checkbox-inner,
          .ant-checkbox-input:focus + .ant-checkbox-inner {
            border-color: var(--orrsiPrimary);
          }
        }

        .price__filter {
          width: 100%;
          margin: 0.9rem 0;

          label {
            font-weight: 500;
          }

          small {
            color: var(--orrsiPrimary);
          }
        }

        .price__range {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          background: #ddd;
          outline: none;
          opacity: 0.7;
          -webkit-transition: 0.2s;
          transition: opacity 0.2s;
          border-radius: 5px;

          &:hover {
            opacity: 1;
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: var(--orrsiPrimary);
            cursor: pointer;
            border-radius: 50%;
          }

          &::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: var(--orrsiPrimary);
            cursor: pointer;
            border-radius: 50%;
          }
        }

        .subcategory__select {
          width: 100%;
          margin-top: 10px;
          .ant-select-selector {
            &:hover {
              border-color: var(--orrsiPrimary) !important;
            }
          }
          .ant-select-focused .ant-select-selector,
          .ant-select-selector:focus,
          .ant-select-selector:active {
            border-color: var(--orrsiPrimary) !important;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
          }

          label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
          }
        }

        .selected__tags {
          margin-top: 15px;
          width: 100%;
          p {
            font-weight: 500;
          }
          .ant-tag {
            margin-top: 5px;
          }
        }
      }
    }

    .products__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      justify-items: start;
      justify-content: start;
      flex: 1;
      gap: 16px;
      grid-row-gap: 35px;
      max-width: initial;
      align-items: flex-start;
      grid-auto-rows: 350px;
      /* overflow: hidden; */

      @media (max-width: 1300px) {
        .card__image {
          height: 180px;
        }
      }
    }
  }

  .loader_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 250px;

    .ant-spin-dot-item {
      background-color: var(--orrsiPrimary);
    }
  }

  .floating__filter__btn {
    display: none;
  }

  .pagination__wrapper {
    width: 100%;
    height: 100px;
  }

  @media (max-width: 600px) {
    .products__section {
      flex-direction: column;
    }

    .filter__box {
      display: none;
    }

    .products__section {
      .products__grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
    }

    .floating__filter__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      background-color: var(--orrsiPrimary);
      padding: 25px;
    }
  }

  @media (max-width: 390px) {
    .products__section {
      .products__grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }
    }
  }
`;
