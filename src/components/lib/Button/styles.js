import styled from "styled-components";
import { Button } from "antd";

// Custom props that must not be forwarded to the underlying antd Button / DOM element
const BUTTON_CUSTOM_PROPS = new Set([
  "width",
  "margin",
  "height",
  "padding",
  "borderColor",
  "border",
  "backgroundColor",
  "radius",
  "boxShadow",
  "opacity",
  "fontSize",
  "color",
  "hoverBg",
  "hoverColor",
]);

export default styled(Button).withConfig({
  shouldForwardProp: (prop) => !BUTTON_CUSTOM_PROPS.has(prop),
})`
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
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease, opacity 0.12s ease;
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || "13px"};

  /* Kill Ant Design ripple wave animation */
  &::after,
  &::before {
    display: none !important;
    animation: none !important;
  }

  span {
    color: ${({ color }) => color || "var(--orrsiBlack)"};
    font-size: ${({ fontSize }) => fontSize || "13px"};
  }

  &:hover:not(:disabled) {
    background: ${({ hoverBg }) => hoverBg || "var(--orrsiPrimary)"} !important;
    border-color: ${({ hoverBg, borderColor }) =>
    hoverBg ? hoverBg : borderColor || "var(--orrsiPrimary)"} !important;
    color: ${({ hoverColor }) => hoverColor || "var(--orrsiWhite)"} !important;

    span {
      color: ${({ hoverColor }) => hoverColor || "var(--orrsiWhite)"} !important;
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--orrsiPrimary);
    outline-offset: 2px;
  }

  /* Disabled: keep our custom background/color, drop Ant Design's opacity override */
  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: ${({ opacity }) => opacity || "1"} !important;
    background: ${({ backgroundColor }) => backgroundColor || "transparent"} !important;
    border-color: ${({ borderColor }) => borderColor || "transparent"} !important;

    span {
      color: ${({ color }) => color || "var(--orrsiBlack)"} !important;
    }
  }

  @media (max-width: 350px) {
    height: ${({ height }) => height === "68px" && "50px"};
  }

  svg {
    font-size: 11px;
    color: inherit;
    margin: 0 0 -2px 4px;
    color: ${({ color }) => color || "var(--orrsiPrimary)"};
  }
`;
