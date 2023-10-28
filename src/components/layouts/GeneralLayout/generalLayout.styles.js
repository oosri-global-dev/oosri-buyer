import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const GeneralLayoutWrapper = styled(FlexibleDiv)`
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  padding: 30px;
  height: 100%;
  width: 100%;
  position: relative;

  @media (max-width: 440px) {
    padding: 10px;
  }
`;
