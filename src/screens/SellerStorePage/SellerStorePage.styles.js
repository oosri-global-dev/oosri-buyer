import styled from "styled-components";

export const StorePageWrapper = styled.div`
  width: 100%;
  padding-bottom: 80px;

  /* ── Banner ── */
  .store__banner {
    position: relative;
    width: 100%;
    height: 260px;
    background: linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff9a9a 100%);
    overflow: hidden;

    @media (max-width: 600px) { height: 180px; }

    img.banner__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .banner__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45));
    }
  }

  /* ── Identity row ── */
  .store__identity {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .store__avatar__wrap {
    position: absolute;
    top: -56px;
    left: 24px;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    border: 4px solid #fff;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    overflow: hidden;
    background: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar__initials {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(135deg, var(--orrsiPrimary), #ff9a9a);
    }

    @media (max-width: 480px) {
      width: 80px;
      height: 80px;
      top: -40px;
    }
  }

  .store__header {
    padding: 68px 0 28px;

    @media (max-width: 480px) { padding: 50px 0 20px; }
  }

  .store__name__row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .store__name {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.2;

    @media (max-width: 480px) { font-size: 1.35rem; }
  }

  .store__verified__badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #e6f9f0;
    color: #1a7a4a;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #b2e8cc;
    letter-spacing: 0.03em;
  }

  .store__country {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 14px;

    img { width: 20px; height: 14px; object-fit: cover; border-radius: 2px; }
  }

  .store__description {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.65;
    max-width: 640px;
    margin-bottom: 20px;
  }

  /* ── Stats row ── */
  .store__stats {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .stat__pill {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.85rem;
    color: #444;

    .stat__num {
      font-weight: 800;
      color: #1a1a1a;
      font-size: 0.95rem;
    }
  }

  /* ── Social links ── */
  .store__socials {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .social__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border: 1px solid #e4e4e4;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #444;
    text-decoration: none;
    transition: border-color 0.12s, color 0.12s, background 0.12s;
    white-space: nowrap;

    &:hover {
      border-color: var(--orrsiPrimary);
      color: var(--orrsiPrimary);
      background: #fff5f5;
    }
  }

  /* ── Divider ── */
  .store__divider {
    height: 1px;
    background: #f0f0f0;
    max-width: 900px;
    margin: 28px auto;
  }

  /* ── Products section ── */
  .store__products {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .products__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
  }

  .products__header__left {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }

  .products__title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0;
  }

  .products__count {
    font-size: 0.82rem;
    color: #888;
    margin: 0;
  }

  .products__search__wrap {
    position: relative;
    display: flex;
    align-items: center;

    .search__icon {
      position: absolute;
      left: 11px;
      color: #aaa;
      pointer-events: none;
      flex-shrink: 0;
    }

    .products__search {
      height: 36px;
      width: 220px;
      padding: 0 32px 0 34px;
      border: 1px solid #e4e4e4;
      border-radius: 8px;
      font-size: 0.85rem;
      color: #1a1a1a;
      background: #fafafa;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;

      &::placeholder { color: #bbb; }
      &:focus {
        border-color: var(--orrsiPrimary);
        box-shadow: 0 0 0 3px rgba(252, 83, 83, 0.08);
        background: #fff;
      }

      @media (max-width: 480px) { width: 100%; }
    }

    .search__clear {
      position: absolute;
      right: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      color: #bbb;
      &:hover { color: #888; }
    }

    @media (max-width: 480px) { width: 100%; }
  }

  .products__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 720px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 440px) { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  }

  .products__empty {
    text-align: center;
    padding: 60px 20px;
    color: #999;
    font-size: 0.9rem;
  }

  .products__pagination {
    display: flex;
    justify-content: center;
    margin-top: 36px;
  }

  /* ── Not found ── */
  .store__not__found {
    text-align: center;
    padding: 100px 20px;

    h2 { font-size: 1.5rem; color: #1a1a1a; margin-bottom: 10px; }
    p { color: #888; font-size: 0.9rem; }
  }
`;
