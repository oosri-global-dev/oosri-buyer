import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const PPWrapper = styled(FlexibleDiv)`
  hr {
    border: 0.4px solid #f5f5f5;
    width: 100%;
  }

  .top__wrapper {
    position: relative;

    .single__item__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 50px;
      height: 15px;
      padding: 8px 15px;
      background-color: #fafafa;
      border-radius: 40px;
      cursor: pointer;

      img {
        width: 15px;
      }

      p {
        margin: 0;
        color: #757575;
      }
    }

    .filter__wrapper {
      position: absolute;
      background-color: white;
      box-sizing: border-box;
      padding: 30px 20px;
      box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.1);
      top: 40px;
      width: 300px;
      height: fit-contentq;

      .filter__wrapper__top__section {
        align-items: flex-start;
        margin-bottom: 20px;

        p {
          margin: 0;
        }

        .top__section__filter__box {
          display: flex;
          gap: 5px;

          img {
            width: 14px;
          }

          p {
            font-size: 1.25rem;
          }
        }
      }

      .category__box {
        box-sizing: border-box;
        background: #f5f5f5;
        padding: 10px;
        border-radius: 12px;
        margin-bottom: 10px;

        p {
          margin: 0;
          color: #999;
          font-weight: 400;
          font-size: 0.8rem;
        }
      }

      .ant-checkbox-group {
        .ant-checkbox-wrapper {
          width: 100%;
          margin-bottom: 10px;
          font-size: 0.9rem;

          .ant-checkbox-checked:not(.ant-checkbox-disabled)
            .ant-checkbox-inner {
            background-color: #008080;
          }
        }
      }

      button {
        margin-top: 15px;
        width: 100%;
        background-color: #eee;
        border-radius: 12px;
        min-height: 40px;
        height: 40px;

        span {
          color: #616161;
        }

        &:hover {
          span {
            color: var(--orrsiPrimary);
          }
        }
      }
    }

    .hide__box {
      display: none;
    }
  }
`;
