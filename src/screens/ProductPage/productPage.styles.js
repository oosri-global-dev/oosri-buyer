import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ProductPageWrapper = styled(FlexibleDiv)`
  width: 100%;

  .top__section {
    /* height: fit-content; */
    max-height: 480px;
    overflow: hidden;


    .top__left__section {
      flex-basis: 60%;
      height: 100%;

      .image__section {
        width: fit-content;
        img {
          width: 80px;
          height: 75px;
          object-fit: cover;
        }
      }

      .main__image__wrapper {
        width: 100%;
        height: 100%;
        .main__image {
          width: 90%;
          height: 100%;
          object-fit: cover;
          /* flex: 2; */
        }
      }
    }

    .top__right__section {
      flex-basis: 40%;
      height: 100%;

      .item__name {
        width: fit-content;
        font-size: 1.7rem;
        margin: 0;
      }

      .item__price {
        font-size: 2.2rem;
        font-weight: bold;
      }
    }
  }
`;
