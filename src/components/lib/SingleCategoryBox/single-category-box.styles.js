import styled from "styled-components";

export const SingleCategoryBoxWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 190px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  }

  /* ── Image area ── */
  .category__image__fill {
    position: absolute;
    inset: 0;
    padding: 20px 16px 48px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      object-fit: contain;
    }
  }

  /* ── Name overlay at bottom ── */
  .category__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 10px 12px;
    border-top: 1px solid #f0f0f0;

    .category__name {
      margin: 0;
      font-size: 0.78rem;
      font-weight: 600;
      color: #1a1a1a;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* ── Mobile ── */
  @media (max-width: 720px) {
    width: 130px;
    height: 160px;

    .category__image__fill {
      padding: 16px 12px 44px;
    }
  }

  @media (max-width: 430px) {
    width: 110px;
    height: 140px;
    border-radius: 10px;

    .category__image__fill {
      padding: 12px 10px 40px;
    }

    .category__overlay {
      padding: 8px 8px;

      .category__name {
        font-size: 0.72rem;
      }
    }
  }
`;
