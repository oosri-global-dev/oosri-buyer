import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const SearchWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 40px 0 120px 0;

  .content__wrap {
    width: 50%;
    .search__textbox {
      border-radius: 10px;
    }

    p {
      margin: 0;
    }

    .recent__searched__box {
      margin-top: 30px;

      .header__text {
        font-weight: bold;
        margin-bottom: 20px;
      }

      .single__search__result {
        margin: 14px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        gap: 10px;
        cursor: pointer;

        .icon__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #eee;
          border-radius: 50%;
        }

        span {
          color: #777777;
        }
      }

      .clear__all__text {
        font-size: 0.9rem;
        color: #777;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 540px) {
    .content__wrap {
      width: 73%;
    }
  }

  @media (max-width: 400px) {
    .content__wrap {
      width: 77%;
    }
  }
`;
