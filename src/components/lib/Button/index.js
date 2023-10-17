import styled from "styled-components";
import { Button } from "antd";

export default styled(Button)`
  width: ${({ width }) => width || "max-content"};
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height || "45px"};
  min-height: ${({ height }) => height || "45px"};
  padding: ${({ width }) => (width ? "0" : "0 20px")};
  border: ${({ border }) => border || "1px solid var(--poprevGray)"};
  border-color: ${({ borderColor, backgroundColor }) =>
    borderColor || "var(--poprevGray)"};
  background: ${({ backgroundColor }) => backgroundColor || "transparent"};
  border-radius: ${({ radius }) => radius || "0"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  opacity: ${({ opacity }) => opacity || "1"};
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ color }) => color || "var(--poprevFadedWhite)"};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || "13px"};
  @media (max-width: 350px) {
    height: ${({ height }) => height === "68px" && "50px"};
  }
  svg {
    font-size: 11px;
    color: inherit;
    margin: 0 0 -2px 4px;
    transition: all 0.3s ease;
    color: ${({ color }) => color || "var(--poprevFadedWhite)"};
  }

  span {
    color: ${({ color }) => color || "var(--poprevWhite)"};
    font-size: 14px;
  }
  small {
    color: ${({ color }) => color || "var(--poprevFadedWhite)"};
    font-size: 12px;
  }
  :focus,
  :active {
    background: ${({ hoverBg }) => hoverBg || "transparent"};
    border-color: ${({ hoverBg, borderColor }) =>
      hoverBg ? hoverBg : borderColor || "var(--poprevYellow)"};

    span,
    small {
      color: ${({ borderColor }) => borderColor || "var(--poprevYellow)"};
    }
  }

  small,
  span {
    z-index: 9;

    &[data-glitch] {
      position: relative;

      &:before,
      &:after {
        content: attr(data-glitch);
        position: absolute;
        left: 0;
        bottom: 0 !important;
        opacity: 0.8;
        display: none;
      }

      &:before {
        color: #00ffff;
        z-index: -1;
        animation: glitch 0.3s ease 0.3s infinite;
      }

      &:after {
        color: #ff00ff;
        z-index: -2;
        animation: glitch 0.3s ease infinite reverse;
      }
    }
    @keyframes glitch {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-2px, 2px);
      }
      40% {
        transform: translate(-2px, -2px);
      }
      60% {
        transform: translate(2px, 2px);
      }
      80% {
        transform: translate(2px, -2px);
      }
      to {
        transform: translate(0);
      }
    }
  }
  small {
    &[data-glitch] {
      &:before,
      &:after {
        bottom: -2px !important;
      }
    }
  }
  :hover {
    background: ${({ hoverBg }) => hoverBg || "transparent"};
    border-color: ${({ hoverBg, borderColor }) =>
      hoverBg ? hoverBg : borderColor || "var(--poprevYellow)"};

    span,
    small {
      color: ${({ borderColor }) => borderColor || "var(--poprevYellow)"};
      &[data-glitch] {
        &:before,
        &:after {
          display: block;
        }
      }
    }
  }
`;
