import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const SCProductWrapper = styled(FlexibleDiv)`
  flex-direction: row;
  height: 150px;
  justify-content: flex-start;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 25px;

  .box__left__section {
    width: 80%;
    height: 100%;

    .product__image__wrapper {
      width: 180px;
      height: 100%;
      display: flex;

      img {
        width: 100%;
        object-fit: fill;
      }
    }

    p {
      margin: 0;
    }

    .text__section {
      height: 100%;

      .product__name {
        font-weight: bold;
      }

      .product__discounted__price {
        color: #777;
        text-decoration: line-through;
      }

      .remove__box {
        display: flex;
        gap: 4px;
        align-items: center;
        cursor: pointer;

        p {
          color: var(--orrsiPrimary);
          text-transform: uppercase;
        }
      }
    }
  }

  .box__right__section {
    width: 20%;

    .product__price {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;
