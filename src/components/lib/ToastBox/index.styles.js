import styled, { css, keyframes } from "styled-components";
import { FlexibleDiv } from "../Box/styles";

const slideIn = keyframes`
  from {
    transform: translateX(400px);
  }
  to {
    transform: translateX(0);
  }
`;

export const CustomToastBoxWrapper = styled(FlexibleDiv)`
  position: fixed;
  top: 170px;
  right: 0;
  width: fit-content;
  min-width: 220px;
  padding: 10px 20px;
  gap: 10px;
  z-index: 9999;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;

  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${slideIn} 0.3s forwards;
    `}

  .message {
    font-size: 1rem;
    font-family: "Inter", sans-serif;
    color: #fff;
  }

  @media (max-width: 650px) {
    min-width: 160px;
    padding: 8px 15px;
    top: 140px;

    .message {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 400px) {
    top: 90px;
  }
`;
