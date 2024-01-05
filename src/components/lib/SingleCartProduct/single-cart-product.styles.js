import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const SCProductWrapper = styled(FlexibleDiv)`
  flex-direction: row;
  height: 150px;
  justify-content: flex-start;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 25px;
  padding-top: 20px;

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

    .right__box__controls {
      border: 1px solid #eee;
      width: fit-content;
      padding: 8px 15px;
      border-radius: 12px;
      gap: 25px;

      .number__of__product {
        font-size: 0.8rem;
      }

      .count__trigger {
        cursor: pointer;
      }

      p {
        margin: 0;
      }
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
    flex-wrap: nowrap;
    height: 180px;

    .box__left__section {
      width: 100%;

      .product__image__wrapper {
        height: 100px;
        width: 160px;

        img {
          object-fit: contain;
        }
      }

      .text__section {
        height: 100%;
      }
    }

    .box__right__section {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      height: fit-content;

      p {
        margin: 0;
      }
    }
  }
`;
