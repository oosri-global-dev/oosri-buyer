import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ProductPageWrapper = styled(FlexibleDiv)`
  width: 100%;
  margin-top: 12px;

  .top__section {
    height: 490px;
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
          cursor: pointer;
          margin-left: auto;
          margin-right: auto;
        }

        .selected__image {
          border: 2px solid var(--orrsiPrimary);
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
        font-size: 1.5rem;
        margin: 0;
      }

      .item__price {
        font-size: 2.2rem;
        font-weight: bold;
      }

      .like__wrapper__box {
        width: fit-content;
        p {
          font-size: 0.9rem;
          font-weight: bold;
          color: #bdbdbd;
          margin: 0;
        }
      }

      .other__details__text {
        font-size: 0.9rem;
        margin: 0;
        color: #616161;
      }

      .reviews__text {
        text-decoration: underline;
      }

      .cart__options {
        width: 65%;
        margin-top: 10px;

        p {
          margin: 10px 0;
        }

        .product__num__selector {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #e0e0e0;

          .icon__class {
            cursor: pointer;
          }
        }

        .checkout__btn {
          width: 100%;
          border-radius: 10px;
        }

        .cart__btn {
          width: 100%;
          border-radius: 10px;
          border: 1px solid var(--orrsiPrimary);
        }
      }
    }
  }

  .ant-tabs-tab {
    .ant-tabs-tab-btn {
      color: #777;
    }

    div[aria-selected="true"] {
      color: var(--orrsiPrimary) !important;
    }
  }

  .ant-tabs-ink-bar {
    background: red;
  }

  .product__reviews {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 5px;

    p {
      margin: 0;
    }

    .num__of__reviews {
      margin: 0;
      background-color: #fedddd;
      border-radius: 15px;
      width: 30px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      color: #424242;
    }
  }

  .product__description {
    position: relative;

    .see__more__reviews {
      background: var(--orrsiPrimary);
      padding: 8px 10px;
      border-radius: 15px;
      font-size: 0.8rem;
      color: var(--orrsiWhite);
      position: absolute;
      bottom: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }

  @media (max-width: 1000px){
    .top__section {
      .top__right__section {
        .cart__options {
          width: 75%;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .top__section {
      flex-direction: column;
      height: fit-content;
      gap: 15px;

      .top__left__section {
        flex-direction: column-reverse;

        .main__image__wrapper {
          .main__image {
            width: 100%;
          }
        }

        .image__section {
          flex-direction: row;
          width: 100%;
          flex-wrap: nowrap;
        }
      }

      .top__right__section {
        .cart__options {
          width: 100%;
        }
      }
    }
  }
`;

export const ProductBreadcrumbsWrapper = styled(FlexibleDiv)`
  margin: 15px 0;
  justify-content: flex-start;
  border-bottom: 1px solid #f5f5f5;
  p {
    color: #9e9e9e;
    font-size: 0.85rem;
    margin-right: 5px;
  }

  .product__text {
    color: black;
  }
`;
