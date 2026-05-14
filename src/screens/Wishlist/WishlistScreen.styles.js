import styled from "styled-components";

export const WishListWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  box-sizing: border-box;

  /* ── Header ── */
  .wishlist__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;

    .header__left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      h1 {
        font-size: 1.6rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      .item__count__badge {
        background: #f5f5f5;
        border: 1px solid #e8e8e8;
        color: #666;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 999px;
      }
    }

    .search__wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fff;
      border: 1.5px solid #e5e5e5;
      border-radius: 10px;
      padding: 0 14px;
      height: 42px;
      min-width: 240px;
      transition: border-color 0.15s ease;

      &:focus-within {
        border-color: var(--orrsiPrimary);
      }

      .search__icon {
        color: #aaa;
        flex-shrink: 0;
      }

      .search__input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 0.88rem;
        color: #1a1a1a;
        background: transparent;
        min-width: 0;

        &::placeholder {
          color: #bbb;
        }
      }
    }
  }

  /* ── Products grid ── */
  .wishlist__content {
    width: 100%;
  }

  .products__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 20px;
    row-gap: 32px;
    align-items: start;
  }

  /* ── Empty state ── */
  .empty__state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 420px;
    gap: 16px;
    padding: 60px 24px;
    text-align: center;

    .empty__icon__ring {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #fafafa;
      border: 1.5px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty__title {
      font-size: 1.15rem;
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

    .empty__cta {
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

  /* ── Responsive ── */
  @media (max-width: 768px) {
    padding: 24px 16px 60px;

    .wishlist__header {
      flex-direction: column;
      align-items: flex-start;

      .search__wrapper {
        width: 100%;
        min-width: unset;
      }
    }

    .products__grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
      row-gap: 24px;
    }
  }

  @media (max-width: 400px) {
    .products__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
