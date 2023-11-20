import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const ProductCardWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  flex-basis: 18.5%;
  /* flex-basis: 23.6%; */
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;

  .card__image {
    width: 100%;
    object-fit: cover;
    height: 250px;
    border-radius: 15px;
  }

  .product__info {
    height: fit-content;
    margin-top: 10px;
    align-items: flex-start;
    margin-bottom: 4px;

    .product__name {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0;
    }

    .likes__wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: fit-content;
      width: 85px;
      gap: 2px;

      .likes__number {
        font-size: 0.7rem;
        color: #bdbdbd;
        font-weight: bold;
        margin: 0;
      }
    }
  }

  .phone__status {
    color: #777777;
    text-align: left;
    width: 100%;
    margin: 0;
    font-size: 0.8rem;
  }

  .product__price__section {
    margin: 0;
    margin-top: 8px;
    align-items: center;
    gap: 7px;

    .product__price {
      font-weight: bold;
      margin: 0;
      width: fit-content;
      text-align: left;
      font-size: 1.1rem;
    }

    .discounted__price {
      margin: 0;
      font-size: 0.75rem;
      text-decoration: line-through;
      color: #777777;
    }
  }

  .favorite__wrapper {
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    cursor: pointer;

    svg {
      stroke-width: 60px;
      stroke: white;
    }
  }

  .seller__info {
    gap: 4px;
    .seller__text {
      width: fit-content;
      text-align: left;
      font-size: 0.65rem;
      color: #bdbdbd;
    }
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1300px) {
    /* flex-basis: 23.6%; */
    flex-basis: 18.5%;

    .card__image {
      height: 230px;

      @media (max-width: 1100px) {
        height: 200px;
      }
    }

    .product__info {
      .product__name {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 150px;
        overflow: hidden;
      }

      .likes__wrapper {
        width: 90px;
        gap: 1px;
      }
    }
  }

  @media (max-width: 1050px) {
    flex-basis: 23.6%;

    .card__image {
      height: 240px;

      @media (max-width: 820px) {
        height: 200px;
      }
    }

    .product__info {
      .product__name {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 130px;
        overflow: hidden;
      }

      .likes__wrapper {
        width: 100px;
        gap: 1px;
      }
    }
  }

  @media (max-width: 700px) {
    flex-basis: 32.1%;

    .card__image {
      height: 180px;
    }
  }

  /* media query for mobiles */
  @media (max-width: 440px) {
    flex-basis: 48%;
    gap: 3px;

    .card__image {
      height: 200px;

      @media (max-width: 280px) {
        height: 140px;
      }
    }

    .product__info {
      height: fit-content;
      .product__name {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 130px;
        overflow: hidden;
      }

      .likes__wrapper {
        width: 55px;
        gap: 1px;
      }

      .likes__number {
        margin: 0;
      }
    }

    .product__price__section {
      margin: 0;
    }

    .seller__info {
      .seller__text {
        margin: 0;
      }
    }

    .favorite__wrapper {
      top: 10px;
      right: 10px;
      width: 25px;
      height: 25px;

      @media (max-width: 280px) {
        width: 20px;
        height: 20px;
      }

      svg {
        stroke-width: 40px;
        stroke: white;
        width: 16px;

        @media (max-width: 280px) {
          width: 14px;
        }
      }
    }
  }
`;
