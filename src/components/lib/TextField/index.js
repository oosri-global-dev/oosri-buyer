import styled from "styled-components";
import { Input } from "antd";

export default styled(Input)`
  width: ${({ width }) => width || "100%"};
  margin: ${({ margin }) => margin || 0};
  height: ${({ height }) => height || "45px"};
  border: ${({ border }) => border || "0.5px solid #E0DED3"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};

  &:focus,
  &:focus-within,
  &:hover {
    border-color: var(--orrsiPrimary);
  }

  /* Remove up and down arrows for number input */
  &.ant-input-number {
    .ant-input-number-handler-wrap {
      display: none;
    }
  }

  /* Remove up and down arrows for number input in Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  /* Remove up and down arrows for number input in Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
