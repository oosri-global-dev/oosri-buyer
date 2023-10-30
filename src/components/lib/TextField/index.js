import styled from "styled-components";
import { Input } from "antd";

export default styled(Input)`
  width: ${({ width }) => width || "100%"};
  margin: ${({ margin }) => margin || 0};
  height: ${({ height }) => height || "45px"};
  border: ${({ border }) => border || "0.5px solid #E0DED3"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
`;
