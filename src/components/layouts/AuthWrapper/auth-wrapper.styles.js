import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const AuthWrapperBox = styled(FlexibleDiv)`
  flex-direction: column;
  min-height: calc(100dvh - 160px);
  max-height: fit-content;
  background-color: #eee;
  padding: 0 25px 25px 25px;
  box-sizing: border-box;

  .top__navigation {
    padding: 8px 0;
    p {
      margin: 0px;
      font-size: 1rem;
      margin-left: 5px;
    }
  }

  .auth__content__wrapper {
    flex-grow: 1;
    background: var(--orrsiWhite);
  }

  @media (max-width: 550px) {
    background: transparent;
    height: fit-content;
    padding: 0;

    .top__navigation {
      border-bottom: 1px solid #cfcfcf;

      svg {
        width: 20px;
        height: 20px;
      }

      p {
        display: none;
      }
    }
  }
`;
