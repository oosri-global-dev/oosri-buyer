import { FlexibleDiv } from "@/components/lib/Box/styles";
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
`;
