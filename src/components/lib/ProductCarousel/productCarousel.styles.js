import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const PCWrapper = styled(FlexibleDiv)`
  width: 100%;
  position: relative;

  .carousel__title {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;

    @media (max-width: 440px) {
      font-size: 1.2rem;
    }
  }

  .product__card__carousel {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1.8%;
    overflow-x: scroll;
    align-items: center;
    justify-content: flex-start;
    scroll-behavior: smooth;

    @media (max-width: 440px) {
      gap: 3.8%;
    }

    > div {
      min-width: 18.5%;
      position: relative;

      @media (max-width: 1300px) {
        min-width: 18.5%;
      }

      @media (max-width: 1050px) {
        min-width: 23.6%;
      }

      @media (max-width: 700px) {
        min-width: 32.1%;
      }

      @media (max-width: 440px) {
        min-width: 48%;
      }
    }

    .flex__end__div {
      justify-content: flex-end;
    }

    .button__wrapper {
      position: absolute;
      z-index: 2;
      pointer-events: none;

      button {
        pointer-events: auto;
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(18, 18, 18, 0.4);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 3;

        @media (max-width: 1100px) {
          width: 40px;
          height: 40px;
        }

        @media (max-width: 700px) {
          width: 35px;
          height: 35px;
        }
      }

      .hide__button {
        display: none;
      }

      .button__left__position {
        left: 0;
        svg {
          padding-right: 2px;
        }
      }

      .button__right__position {
        right: 0;

        svg {
          padding-left: 2px;
        }
      }
    }
  }
`;
