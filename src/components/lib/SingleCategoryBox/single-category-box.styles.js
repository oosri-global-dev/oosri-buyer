import styled from "styled-components";
import { FlexibleDiv } from "../Box/styles";

export const SingleCategoryBoxWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  flex-basis: 18.5%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  background: #f5f5f5;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 200px;
  flex-wrap: nowrap;
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: var(--orrsiPrimary);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    cursor: pointer;
  }

  .category__image {
    width: 100%;
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .category__name {
    width: 100%;
    text-align: center;
    background: #fff;
    margin: 0;
    padding: 11px 8px;
    font-size: 0.82rem;
    font-weight: 500;
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
    border-top: 1px solid #f0f0f0;
  }

  @media (max-width: 1300px) {
    flex-basis: 18.5%;
  }

  @media (max-width: 1050px) {
    flex-basis: 23.6%;
    height: 180px;
  }

  @media (max-width: 720px) {
    height: 155px;
    flex-basis: 30%;
  }

  @media (max-width: 430px) {
    flex-basis: auto;
    min-width: 28%;
    height: 130px;
    box-shadow: none;

    .category__name {
      font-size: 0.73rem;
      padding: 8px 4px;
    }
  }
`;
