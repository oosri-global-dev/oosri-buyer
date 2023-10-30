import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const HeroCarouselWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: 580px;

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

        button:not(.carousel__dot--selected) {
          background-color: #999999;
          border-color: #999999;
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

      svg {
        width: 30px;
        height: 30px;
      }
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

  @media (max-width: 1370px) {
    height: 560px;
  }

  @media (max-width: 1100px) {
    height: 540px;
  }

  @media (max-width: 920px) {
    height: 500px;
  }

  @media (max-width: 600px) {
    height: 400px;

    .carousel__container {
      .custom__carousel__button {
        position: absolute;
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: 35px;
        height: 35px;

        svg {
          width: 15px;
          flex-shrink: 0;
        }
      }
    }
  }

  @media (max-width: 440px) {
    height: 230px;

    .carousel__container {
      .carousel__slider {
        div {
          .carousel__inner-slide {
            border-radius: 5px;
          }
        }

        .custom__carousel__dot {
          bottom: 10px;
          gap: 3px;

          button.carousel__dot {
            width: 7px;
            height: 7px;
          }
        }
      }

      .custom__carousel__button {
        position: absolute;
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: 25px;
        height: 25px;

        svg {
          width: 15px;
          flex-shrink: 0;
        }
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

  @media (max-width: 920px) {
    .text__section {
      width: 80%;

      .hero__text {
        font-size: 2rem;

        @media (max-width: 800px) {
          font-size: 1.8rem;
        }
      }

      .hero__sub__text {
        font-size: 1.3rem;
      }
    }

    button {
      margin-top: 10px !important;
      font-size: 0.8rem;
      height: 35px;
      padding: 0px 25px;
      min-height: 30px;
    }
  }

  @media (max-width: 600px) {
    .text__section {
      width: 80%;

      .hero__text {
        font-size: 1.2rem;
      }

      .hero__sub__text {
        font-size: 0.9rem;
      }
    }

    button {
      margin-top: 10px !important;
      font-size: 0.8rem;
      height: 35px;
      padding: 0px 25px;
      min-height: 30px;
    }
  }

  @media (max-width: 440px) {
    .text__section {
      width: 80%;

      .hero__text {
        font-size: 1rem;
      }

      .hero__sub__text {
        font-size: 0.8rem;
      }
    }

    button {
      margin-top: 10px !important;
      font-size: 0.8rem;
      height: 30px;
      padding: 0px 25px;
      min-height: 30px;
    }
  }

  /* Smallest screen on the chrome developer tool */
  @media (max-width: 280px) {
    .text__section {
      width: 80%;

      .hero__text {
        font-size: 0.8rem;
      }

      .hero__sub__text {
        font-size: 0.7rem;
      }
    }

    button {
      margin-top: 0px !important;
      font-size: 0.8rem;
      height: 30px;
      padding: 0px 25px;
      min-height: 30px;
    }
  }
`;
