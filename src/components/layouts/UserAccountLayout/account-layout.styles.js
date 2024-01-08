import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const AccountLayoutWrapper = styled(FlexibleDiv)`
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 30px;
  width: 100%;
  align-items: flex-start;
  align-items: stretch;
  box-sizing: border-box;
  min-height: 600px;
  max-height: 100%;

  .profile__navigation {
    width: 32%;
    height: 100%;

    h1 {
      font-weight: normal;
    }

    .menu__wrapper {
      margin-top: 40px;
      gap: 15px;

      .nav__menu {
        padding: 15px;
        width: 60%;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
        transition: 5ms all;

        &:hover {
          background-color: rgba(254, 221, 221, 0.8);
        }

        .menu__icon {
          color: #333;
        }

        .active__menu {
          color: var(--orrsiPrimary);
        }

        p {
          margin: 0;
          font-size: 0.9rem;
        }
      }

      .active__background {
        background: rgba(254, 221, 221, 0.8);
      }
    }
  }

  .profile__content {
    width: 65%;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    border-left: 1px solid #eee;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    padding: 5px;
    margin-top: 10px;
    height: fit-content;

    .profile__navigation {
      width: 100%;

      h1 {
        font-size: 1.5rem;
      }

      .menu__wrapper {
        flex-direction: row;
        justify-content: flex-start;
        overflow: scroll;
        gap: 5px;

        .nav__menu {
          width: fit-content;
          padding: 8px;

          &:hover {
            background: white;
          }
        }

        .active__background {
          background: white;
          box-shadow: none;
          border-radius: 0;
          border-bottom: 1px solid #fc5353;
        }
      }

      .menu__wrapper {
        margin-top: 10px;
      }
    }

    .profile__content {
      width: 100%;
      height: fit-content;
      padding-bottom: 100px;
      border: none;
    }
  }
`;
