import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const AuthWrapperBox = styled(FlexibleDiv)`
  flex-direction: column;
  width: 100%;
  min-height: calc(100dvh - 160px);
  background-color: #eee;
  padding: 0 25px 25px 25px;
  box-sizing: border-box;

  .top__navigation {
    padding: 8px 0;
    cursor: pointer;

    p {
      margin: 0;
      font-size: 1rem;
      margin-left: 5px;
    }
  }

  .auth__content__wrapper {
    flex-grow: 1;
    width: 100%;
    background: var(--orrsiWhite);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    box-sizing: border-box;
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

    .auth__content__wrapper {
      padding: 40px 16px;
      align-items: flex-start;
    }
  }
`;