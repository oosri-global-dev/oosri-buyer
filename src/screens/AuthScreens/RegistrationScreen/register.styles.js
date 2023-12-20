import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const LoginWrapper = styled(FlexibleDiv)`
  height: fit-content;
  background: var(--orrsiWhite);
  margin: 100px 0;
  flex-wrap: nowrap;

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

  .radio__group__support {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 15px;
    flex-wrap: nowrap;

    .radio__box {
      width: 100%;
      padding: 10px;
      border: 1px solid #e0ded3;
      border-radius: 14px;
      justify-content: space-between;
      box-sizing: border-box;
      margin: 0;
      background: #fafafa;
      flex-direction: row-reverse;

      span {
        font-size: 1.1rem;
        margin: 0;
        padding: 0;
      }

      &::after {
        display: none;
      }
    }

    .ant-radio-inner {
      border-color: #eee;
    }

    :where(.css-dev-only-do-not-override-3mqfnx).ant-radio-wrapper
      .ant-radio-checked
      .ant-radio-inner {
      background-color: var(--orrsiPrimary);
    }
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
