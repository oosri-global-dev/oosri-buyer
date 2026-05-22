import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ShopPageWrapper = styled(FlexibleDiv)`
  position: relative;

  .mobile__shop__header {
    display: none;
    font-size: 1.3rem;
    font-weight: 700;
    color: #111;
    margin: 16px 0 4px;
    letter-spacing: -0.01em;
    align-self: flex-start;
    width: 100%;
    text-align: left;
  }

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

    .search__banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: #fdf5f5;
      border: 1px solid rgba(252, 83, 83, 0.15);
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 14px;
      font-size: 0.875rem;
      color: #444;

      .search__banner__clear {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        color: var(--orrsiPrimary);
        white-space: nowrap;
        padding: 0;
        &:hover { text-decoration: underline; }
      }
    }

    .results__bar {
      padding: 0 0 14px 0;
      flex-shrink: 0;

      .results__count {
        font-size: 0.82rem;
        color: #888;
        margin: 0;
      }

      .sort__select {
        .ant-select-selector {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding-right: 0 !important;
          font-size: 0.82rem;
          color: #444;
        }
        .ant-select-arrow { color: #aaa; }
      }
    }

    .products__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      flex: 1;
      gap: 16px;
      max-width: initial;
      align-items: start;
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

  /* ── Filter drawer shell ── */
  .ant-drawer-content-wrapper {
    border-radius: 22px 22px 0 0 !important;
    overflow: hidden;
  }

  .ant-drawer-header {
    padding: 18px 20px 14px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
  }

  .ant-drawer-header-title {
    width: 100%;
  }

  .ant-drawer-title {
    width: 100%;
  }

  .ant-drawer-body {
    padding: 0;
    overflow-y: auto;
    max-height: 62vh;
    background: #fafafa;
  }

  .ant-drawer-footer {
    padding: 14px 20px 18px;
    border-top: 1px solid #f0f0f0;
    background: #fff;
  }

  /* ── Drawer header elements ── */
  .drawer__title__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .drawer__title__text {
    font-size: 1rem;
    font-weight: 700;
    color: #111;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .drawer__filter__badge {
    background: var(--orrsiPrimary);
    color: #fff;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 8px;
    line-height: 1.5;
  }

  .drawer__close__btn {
    background: #f0f0f0;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.78rem;
    color: #444;
    flex-shrink: 0;
    &:hover { background: #e4e4e4; }
  }

  /* ── Drawer footer buttons ── */
  .drawer__footer {
    display: flex;
    gap: 10px;
  }

  .drawer__clear__btn {
    flex: 1;
    height: 46px;
    border-radius: 12px;
    border: 1.5px solid #e0e0e0;
    background: #fff;
    font-size: 0.88rem;
    font-weight: 600;
    color: #555;
    cursor: pointer;
    transition: border-color 0.15s;
    &:hover { border-color: #bbb; color: #111; }
  }

  .drawer__apply__btn {
    flex: 2;
    height: 46px;
    border-radius: 12px;
    border: none;
    background: var(--orrsiPrimary);
    color: #fff;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
    &:hover { opacity: 0.88; }
  }

  /* ── Filter content inside the drawer ── */
  .ant-drawer-body .category__filters {
    padding: 0;

    .filter__meta {
      display: none; /* "Clear" button moved to footer */
    }

    /* ── Section block ── */
    .filter__section {
      background: #fff;
      border-bottom: 1px solid #f0f0f0;
      padding: 18px 20px;
    }

    .filter__section__label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #999;
      margin: 0 0 14px;
    }

    /* ── Category chips ── */
    .custom__checkbox__group {
      display: flex;
      flex-direction: column;
      gap: 0;

      .ant-checkbox-wrapper {
        margin-inline-start: 0 !important;
        display: flex;
        align-items: center;
        padding: 11px 0;
        border-bottom: 1px solid #f5f5f5;
        font-size: 0.9rem;
        color: #222;
        font-weight: 500;

        &:last-child { border-bottom: none; }

        .ant-checkbox {
          top: 0;
        }

        .ant-checkbox-inner {
          border-radius: 5px;
          width: 18px;
          height: 18px;
        }
      }

      .ant-checkbox-wrapper-checked {
        color: var(--orrsiPrimary);

        .ant-checkbox-inner {
          background-color: var(--orrsiPrimary);
          border-color: var(--orrsiPrimary);
        }
      }

      .ant-checkbox-wrapper:hover .ant-checkbox-inner,
      .ant-checkbox:hover .ant-checkbox-inner {
        border-color: var(--orrsiPrimary);
      }
    }

    /* ── Price filter ── */
    .price__filter {
      width: 100%;
      margin: 0;

      label {
        display: none; /* replaced by section label + price chips */
      }

      .price__chips {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 18px;

        .price__chip {
          flex: 1;
          background: #f8f8f8;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          padding: 9px 12px;
          text-align: center;

          .chip__label {
            font-size: 0.68rem;
            color: #999;
            display: block;
            margin-bottom: 2px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .chip__value {
            font-size: 0.92rem;
            font-weight: 700;
            color: #111;
          }
        }

        .price__chip__divider {
          font-size: 1rem;
          color: #ccc;
          font-weight: 300;
        }
      }

      .ant-slider {
        margin: 0 6px;

        .ant-slider-rail { background: #e8e8e8; height: 4px; border-radius: 99px; }
        .ant-slider-track { background: var(--orrsiPrimary); height: 4px; border-radius: 99px; }
        .ant-slider-handle {
          width: 20px;
          height: 20px;
          margin-top: -8px;
          border: 2.5px solid var(--orrsiPrimary);
          background: #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,0.12);
          &::after { display: none; }
          &:hover, &:focus { border-color: var(--orrsiPrimary); }
        }
      }

      .price__hint {
        margin: 10px 0 0;
        font-size: 0.72rem;
        color: #bbb;
        text-align: center;
      }
    }

    /* ── Subcategory select ── */
    .subcategory__select {
      width: 100%;
      margin-top: 0;
      background: #fff;
      border-bottom: 1px solid #f0f0f0;
      padding: 18px 20px;

      label {
        display: block;
        margin-bottom: 10px;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #999;
      }

      .ant-select-selector {
        border-radius: 10px !important;
        border-color: #e0e0e0 !important;
        background: #f8f8f8 !important;
        min-height: 42px !important;

        &:hover { border-color: var(--orrsiPrimary) !important; }
      }

      .ant-select-focused .ant-select-selector,
      .ant-select-selector:focus,
      .ant-select-selector:active {
        border-color: var(--orrsiPrimary) !important;
        box-shadow: 0 0 0 2px rgba(220, 80, 80, 0.12) !important;
      }

      .ant-select-selection-item {
        background: rgba(var(--orrsiPrimaryRgb, 220, 80, 80), 0.08);
        border-color: rgba(var(--orrsiPrimaryRgb, 220, 80, 80), 0.2);
        border-radius: 6px;
        color: var(--orrsiPrimary);
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    /* ── Active filter chips ── */
    .selected__tags {
      background: #fff;
      padding: 14px 20px 18px;

      p {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #999;
        margin: 0 0 10px;
      }

      .ant-tag {
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 0.8rem;
        font-weight: 500;
        background: rgba(var(--orrsiPrimaryRgb, 220, 80, 80), 0.06);
        border: 1px solid rgba(var(--orrsiPrimaryRgb, 220, 80, 80), 0.25);
        color: var(--orrsiPrimary);
        margin: 0 6px 6px 0;

        .ant-tag-close-icon {
          color: var(--orrsiPrimary);
          opacity: 0.6;
          &:hover { opacity: 1; }
        }
      }
    }
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
    .mobile__shop__header {
      display: block;
    }

    .products__section {
      flex-direction: column;
    }

    .filter__box {
      display: none;
    }

    .products__section {
      .products__grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
    }

    .floating__filter__btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      background: var(--orrsiPrimary);
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 12px 22px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(var(--orrsiPrimaryRgb, 220, 80, 80), 0.35);
      white-space: nowrap;

      .floating__filter__count {
        background: rgba(255, 255, 255, 0.25);
        color: #fff;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 1px 6px;
        line-height: 1.5;
      }

      &:hover {
        opacity: 0.88;
      }
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