import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ChangePasswordWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: inherit;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  flex-basis: 100%;

  .top__nav {
    margin-bottom: 30px;
    box-sizing: border-box;
    padding: 0px 10px;

    .left__section {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: var(--orrsiPrimary);

        svg {
          color: var(--orrsiPrimary);
        }
      }
    }
  }

  .avatar__wrapper {
    width: 150px;
    height: 150px;
    z-index: 2;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      z-index: 1;
      border-radius: 50%;
    }
  }

  .form__box {
    width: 54%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    flex-wrap: nowrap;
    padding-bottom: 50px;

    .input__label {
      font-size: 0.9rem;
      margin-bottom: 4px;
    }

    .move__down {
      margin-bottom: 20px;
    }

    .password__style {
      width: 100%;
      height: 45px;
      border: 0.5px solid #e0ded3;
      border-radius: 10px;
    }
  }

  @media (max-width: 550px) {
    margin-top: 25px;

    .form__box {
      width: 90%;
      padding-bottom: 30px;
    }
  }
`;
