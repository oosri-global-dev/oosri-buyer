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

  &:hover {
    border: 0.5px solid var(--orrsiPrimary);
    cursor: pointer;
  }

  .category__image {
    max-width: 80%;
    height: 100px;
    object-fit: contain;
    padding: 20px 0;
    flex-grow: 1;
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

  @media (max-width: 700px) {
    flex-basis: 32.1%;
  }

  /* media query for mobiles */
  @media (max-width: 440px) {
    flex-basis: 48%;
    height: 200px;
  }
`;
