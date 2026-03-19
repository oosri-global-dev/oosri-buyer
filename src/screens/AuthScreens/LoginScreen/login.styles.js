import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const LoginWrapper = styled(FlexibleDiv)`
  height: 100%;
  background: var(--orrsiWhite);

  .toaster__style {
    position: relative !important;
    z-index: 9999 !important;
    height: fit-content !important;
    width: 100% !important;
    pointer-events: none;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    margin: 10px 0;
  }

  .google__auth__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  .input__label {
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  .move__down {
    margin-bottom: 30px;
  }

  .password__style {
    width: 100%;
    margin: 0;
    height: 45px;
    border: 0.5px solid #e0ded3;
    border-radius: 10px;
  }

  .forgot__pass__text {
    font-size: 0.9rem;
    color: #555;
    text-align: right;
    width: 100%;

    a {
      text-decoration: none;
    }

    span {
      color: var(--orrsiPrimary);
      font-weight: 600;
      cursor: pointer;
    }
  }

  .no__account__yet {
    font-size: 0.9rem;
    color: #777;
    text-align: center;
    width: 100%;
    margin: 0;
    margin-top: 12px;

    a {
      text-decoration: none;
      color: #777;

      span {
        text-decoration: underline;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 550px) {
    padding: 0 25px;
  }
`;
