import styled from "styled-components";

export const ProductReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 12px 0;
  border-bottom: ${({ isLastElem }) => (isLastElem ? "none" : "1px solid #BBBBBB80")};
  width: 100%;

  .reviewer__image__wrapper {
    flex-shrink: 0;
    width: 35px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .reviewer__image__wrapper__mobile {
    display: none;
    flex-shrink: 0;
    width: 35px;

    @media screen and (max-width: 768px) {
      display: flex;
    }
  }

  .reviewer__content__wrapper {
    flex: 1;
  }

  .reviewer__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #212121;
    margin: 0;
  }

  .reviewer__content {
    font-size: 0.875rem;
    color: #616161;
    margin: 0;
    line-height: 1.5;
  }

  .date_number {
    font-size: 0.75rem;
    color: #999;
    margin: 0;
  }
`;

export const ReviewsWrapper = styled.div`
  .reviews__list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .review__card {
    padding: 20px 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-of-type { border-bottom: none; }
  }

  .review__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .reviewer__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff9a9a 100%);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .reviewer__meta {
    flex: 1;
  }

  .reviewer__name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 3px;
  }

  .reviewer__stars {
    display: flex;
    gap: 2px;
  }

  .review__date {
    font-size: 0.75rem;
    color: #aaa;
    white-space: nowrap;
    margin-left: auto;
  }

  .review__text {
    font-size: 0.875rem;
    color: #444;
    line-height: 1.6;
    margin: 0;
  }

  .reviews__empty {
    padding: 32px 0;
    p {
      font-size: 0.9rem;
      color: #888;
      margin: 0;
    }
  }

  .see__all__btn {
    display: inline-flex;
    align-items: center;
    margin-top: 16px;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--orrsiPrimary);
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;

    &:hover {
      background: #fff5f5;
      border-color: var(--orrsiPrimary);
    }
  }
`;
