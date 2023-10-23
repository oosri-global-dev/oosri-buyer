import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const HeroCarouselWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: 580px;
  /* background-color: red; */

  .carousel__container {
    width: 100%;
    height: 100%;
    position: relative;

    .carousel__slider {
      width: 100%;
      height: 100%;

      div {
        height: 100%;
        overflow: hidden;

        .carousel__inner-slide {
          border-radius: 10px;
        }
      }

      .custom__carousel__dot {
        position: absolute;
        bottom: 40px;
        width: 100%;
        height: fit-content;
        transform: translateX(47.5%);
        display: flex;
        gap: 5px;
        

        button.carousel__dot {
          border-radius: 50%;
          width: 10px;
          height: 10px;
          margin: 0px;
          padding: 0px;
          background-color: white;
        }
      }

      button {
        margin-top: 30px;
      }
    }

    .custom__carousel__button {
      position: absolute;
      border: 1px solid rgba(255, 255, 255, 0.3);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: rgba(18, 18, 18, 0.9);
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      transform: translateY(-50%);
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
`;

export const BannerBox = styled(FlexibleDiv)`
  width: 100%;
  height: 100px;
  background-image: ${({ bgimage }) => (bgimage ? `url(${bgimage})` : "white")};
  background-position: center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: multiply;
  flex-direction: column;

  .text__section {
    height: fit-content !important;
    width: 50%;
    color: var(--orrsiWhite);

    .hero__text {
      font-size: 3rem;
      text-align: center;
      font-weight: bold;
    }

    .hero__sub__text {
      text-align: center;
    }
  }
`;
