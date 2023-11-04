import { FlexibleDiv } from "../Box/styles";
import styled from "styled-components";

export const PGWrapper = styled(FlexibleDiv)`
  .view__all__style {
    font-size: 1.1rem;
    color: #757575;
    cursor: pointer;
  }

  .grid__wrapper {
    gap: 2.6%;
    justify-content: flex-start;
  }

  @media (max-width: 440px) {
    h2 {
      font-size: 1.2rem;
    }

    .view__all__style {
      font-size: 1rem;
    }
  }
`;
