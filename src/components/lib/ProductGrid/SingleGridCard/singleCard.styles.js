import styled from "styled-components";
import { FlexibleDiv } from "../../Box/styles";

export const SingleCardWrapper = styled(FlexibleDiv)`
  justify-content: flex-start;
  height: 120px;
  /* width: 23%; */
  width: 31.5%;
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 30px;
  transition: box-shadow 0.1s ease-out;
  -webkit-transition: box-shadow 0.1s ease-out;

  /* @media (max-width: 1300px) {
    width: 31.5%;
    margin-bottom: 20px;
  } */

  @media (max-width: 1050px) {
    width: 48.5%;
  }

  @media (max-width: 700px) {
    width: 100%;
  }

  @media (max-width: 440px) {
    width: 100%;
  }

  @media (max-width: 280px) {
    height: 100px;
    margin-bottom: 20px;
  }

  &:hover {
    box-shadow: 1px 8px 20px grey;
    transition: box-shadow 0.4s ease-in;
    -webkit-transition: box-shadow 0.4s ease-in;
    cursor: pointer;
  }

  .img__wrapper {
    width: 120px;
    height: 100%;
    position: relative;
    overflow: hidden;

    > span[aria-live="polite"] {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 280px) {
      width: 70px;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .product__info {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    height: 100%;
    margin-left: 12px;

    > span[aria-live="polite"] {
      width: 100%;
    }

    @media (max-width: 280px) {
      width: fit-content;
    }

    p {
      margin: 0;

      @media (max-width: 280px) {
        width: fit-content;
      }
    }

    .device__name {
      font-size: 1rem;
      font-weight: normal;
      width: 180px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      @media (max-width: 440px) {
        font-size: 1.1rem;
      }

      @media (max-width: 280px) {
        font-size: 0.9rem;
        width: fit-content;
      }
    }

    .price__wrapper {
      gap: 10px;
      flex-wrap: nowrap;

      @media (max-width: 280px) {
        width: fit-content;
      }

      .product__price__grid {
        font-size: 1.15rem;
        font-weight: bold;

        @media (max-width: 280px) {
          font-size: 1rem;
        }
      }

      .discounted__price__grid {
        font-weight: normal;
        font-size: 0.75rem;
        text-decoration: line-through;
        color: #777;
      }
    }

    .likes__wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: fit-content;
      gap: 2px;

      .likes__number {
        font-size: 0.7rem;
        color: #bdbdbd;
        font-weight: bold;
      }
    }
  }
`;
