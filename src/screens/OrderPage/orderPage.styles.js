import styled from "styled-components";

export const OrderPageWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 0 80px;
  box-sizing: border-box;

  /* ── Page header ── */
  .page__header {
    margin-bottom: 28px;

    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 4px 0;
    }

    .order__total__count {
      font-size: 0.88rem;
      color: #888;
      margin: 0;
    }
  }

  /* ── Tab bar ── */
  .tabs__bar {
    display: flex;
    border-bottom: 1px solid #efefef;
    margin-bottom: 28px;
    gap: 0;

    .tab__btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 0.9rem;
      font-weight: 500;
      color: #888;
      cursor: pointer;
      transition: color 0.15s ease, border-color 0.15s ease;
      margin-bottom: -1px;

      &:hover {
        color: #1a1a1a;
      }

      &.active {
        color: var(--orrsiPrimary);
        border-bottom-color: var(--orrsiPrimary);
        font-weight: 600;
      }

      .tab__count {
        background: #f0f0f0;
        color: #666;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 999px;
        min-width: 22px;
        text-align: center;
        transition: background 0.15s ease, color 0.15s ease;

        &.active {
          background: rgba(252, 83, 83, 0.12);
          color: var(--orrsiPrimary);
        }
      }
    }
  }

  /* ── Orders list ── */
  .orders__content {
    width: 100%;
  }

  .orders__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* ── Empty state ── */
  .empty__state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 380px;
    gap: 14px;
    text-align: center;
    padding: 40px 24px;

    .empty__icon__ring {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: #fafafa;
      border: 1.5px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty__title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }

    .empty__subtitle {
      font-size: 0.88rem;
      color: #888;
      margin: 0;
      max-width: 320px;
      line-height: 1.6;
    }

    .shop__btn {
      margin-top: 8px;
      background: var(--orrsiPrimary);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 12px 32px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s ease;

      &:hover {
        opacity: 0.88;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 20px 0 60px;

    .page__header h1 {
      font-size: 1.3rem;
    }

    .tabs__bar .tab__btn {
      padding: 10px 14px;
      font-size: 0.83rem;
      gap: 6px;
    }
  }
`;
