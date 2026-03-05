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

    /* ✅ Sidebar filter card (matches screenshot) */
    .filter__box {
      width: 260px;
      min-width: 260px;
      height: auto;
      border-radius: 15px;
      border: 1px solid #e6e6e6;
      background: #fff;
      padding: 14px 14px;
      box-sizing: border-box;

      position: sticky;
      top: 110px; /* adjust if your header height differs */
      align-self: flex-start;

      .filter__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .filter__title {
        margin: 0;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #111;
      }

      .category__filters {
        width: 100%;

        .filter__meta {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 8px;
        }

        .filter__clear {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 12px;
          padding: 0;
          color: #8c8c8c;
          transition: color 0.15s ease;
        }

        .filter__clear:hover {
          color: #111;
        }

        .custom__checkbox__group {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .ant-checkbox-wrapper {
            margin-inline-start: 0 !important;
            color: #111;
            font-size: 13px;
          }

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
            font-size: 12px;
            color: #111;
            display: block;
            margin-bottom: 6px;
          }

          /* ✅ Red hint line like screenshot */
          .price__hint {
            margin: 8px 0 0;
            font-size: 11px;
            color: var(--orrsiPrimary);
          }
        }

        /* Old slider styling kept (harmless even though you use Antd Slider) */
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

          label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            font-size: 12px;
            color: #111;
          }

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
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .ant-pagination-item-active {
      background-color: var(--orrsiPrimary);
      border-color: var(--orrsiPrimary);
    }

    .ant-pagination-item-active a {
      color: #fff;
    }

    .ant-pagination-item:hover {
      border-color: var(--orrsiPrimary);
    }

    .ant-pagination-item:hover a {
      color: var(--orrsiWhite);
    }

    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
      &:hover {
        color: var(--orrsiPrimary);
        border-color: var(--orrsiPrimary);
      }
    }
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