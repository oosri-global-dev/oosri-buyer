import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const PCWrapper = styled(FlexibleDiv)`
  width: 100%;
  position: relative;

  .carousel__title {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
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
    /* position: relative; */

    > div {
      min-width: 18.5%;
      position: relative;
    }

    .button__wrapper {
      position: absolute;

      button {
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
