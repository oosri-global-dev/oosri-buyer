import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const SingleCategoryBoxWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  flex-basis: 18.5%;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
  height: 210px;
  flex-wrap: nowrap;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  box-sizing: border-box;

  &:hover {
    border: 0.5px solid var(--orrsiPrimary);
    cursor: pointer;
  }

  .category__image {
    max-width: 80%;
    height: 100px;
    flex-grow: 1;
    position: relative;
    width: inherit;

    img {
      padding: 20px 0;
      box-sizing: border-box;
    }
  }

  .category__name {
    width: 100%;
    text-align: center;
    background: var(--orrsiWhite);
    margin: 0;
    padding: 14px 0;
  }

  @media (max-width: 1300px) {
    flex-basis: 18.5%;
  }

  @media (max-width: 1050px) {
    flex-basis: 23.6%;
  }

  @media (max-width: 720px) {
    height: 150px;

    .category__image {
      height: 70px;
      max-width: 60%;
      object-fit: contain;
    }
  }

  /* media query for mobiles */
  @media (max-width: 430px) {
    flex-basis: auto;
    min-width: 30%;
    height: fit-content;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: none;

    .category__image {
      height: 75px;

      img {
        padding: 5px 0;
      }
    }

    .category__name {
      font-size: 13px;
      padding: 10px 0;
    }
  }
`;
