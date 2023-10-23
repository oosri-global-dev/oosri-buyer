import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const ProductCardWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  flex-basis: 18.5%;
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
    margin-top: 4px;

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
      width: 130px;
      gap: 5px;

      .likes__number {
        font-size: 0.7rem;
        color: #bdbdbd;
        font-weight: bold;
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
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
