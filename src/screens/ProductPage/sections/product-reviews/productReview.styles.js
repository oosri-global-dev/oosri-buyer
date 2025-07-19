import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ProductReviewWrapper = styled(FlexibleDiv)`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 20px;

  .reviewer__image__wrapper {
    width: fit-content;
    margin-right: 12px;
    overflow: hidden;
    width: 40px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .reviewer__content__wrapper {
    width: 100%;

    .reviewer__image__wrapper__mobile {
      display: none;
    }

    p {
      margin: 0;
    }

    .reviewer__name {
      font-weight: bold;
    }

    .reviewer__content {
      font-size: 0.9rem;
    }
  }


  @media (max-width: 550px) {
    border-bottom: ${({ isLastElem }) =>
      isLastElem ? "" : "1px solid rgba(187, 187, 187, 0.2);"};
    padding-bottom: 14px;

    .reviewer__image__wrapper {
      display: none;
    }

    .reviewer__content__wrapper {
      .reviewer__image__wrapper__mobile {
        display: flex;
        width: fit-content;
        margin-right: 12px;
        overflow: hidden;
        width: 40px;
        height: 35px;
        border-radius: 50%;
      }
    }
  }
`;
