import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const EditProfileWrapper = styled(FlexibleDiv)`
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

    .spin__box {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: column;

      .ant-spin-text {
        right: 30px;
      }
    }

    .upload__image__btn {
      position: absolute;
      color: #999;
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      right: -90px;
      z-index: 9999;
      cursor: pointer;
      transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
      display: flex;
      align-items: center;
      gap: 5px;

      svg {
        padding-bottom: 1px;
      }

      &:hover {
        background: rgba(254, 221, 221, 0.8);
        color: var(--orrsiPrimary);
      }
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
  }

  @media (max-width: 550px) {
    margin-top: 25px;

    .form__box {
      width: 90%;
      padding-bottom: 30px;
    }
  }
`;
