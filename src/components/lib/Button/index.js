import styled from "styled-components";
import { Button } from "antd";

export default styled(Button)`
  width: ${({ width }) => width || "max-content"};
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height || "45px"};
  min-height: ${({ height }) => height || "45px"};
  padding: ${({ padding }) => (padding ? padding : "0 20px")};
  border-color: ${({ borderColor }) => borderColor || "transparent"};
  border: ${({ border }) => border || "1px solid transparent"};
  background: ${({ backgroundColor }) => backgroundColor || "transparent"};
  border-radius: ${({ radius }) => radius || "0"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  opacity: ${({ opacity }) => opacity || "1"};
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ color }) => color || "var(--orrsiBlack)"};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || "13px"};

  &:hover {
    background: ${({ hoverBg }) => hoverBg || "var(--orrsiPrimary)"};
    cursor: pointer;
    border-color: ${({ hoverBg, borderColor }) =>
      hoverBg ? hoverBg : borderColor || "var(--orrsiPrimary) !important"};
    color: ${({ hoverColor }) => hoverColor || "var(--orrsiWhite)"} !important;
    cursor: pointer !important;
  }

  @media (max-width: 350px) {
    height: ${({ height }) => height === "68px" && "50px"};
  }

  svg {
    font-size: 11px;
    color: inherit;
    margin: 0 0 -2px 4px;
    transition: all 0.3s ease;
    color: ${({ color }) => color || "var(--orrsiPrimary)"};
  }

  :focus,
  :active {
    background: ${({ hoverBg }) => hoverBg || "transparent"};
    border-color: ${({ hoverBg, borderColor }) =>
      hoverBg ? hoverBg : borderColor || "var(--orrsiPrimary)"};

    span,
    small {
      color: ${({ borderColor }) => borderColor || "var(--orrsiPrimary)"};
    }
  }
`;
