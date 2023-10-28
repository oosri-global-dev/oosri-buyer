import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const SDWrapper = styled(FlexibleDiv)`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.8%;
  flex-wrap: wrap;

  .view__all__style {
    font-size: 1.1rem;
    color: #757575;
    cursor: pointer;
  }

  @media (max-width: 440px){
    justify-content: space-between;

    h2 {
      font-size: 1.2rem;
    }

    .view__all__style {
      font-size: 1rem;
    }
  }
`;
