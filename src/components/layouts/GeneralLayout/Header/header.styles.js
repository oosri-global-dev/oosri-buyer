import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const HeaderWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  position: sticky;
  top: 0;
  padding: 12px 0;
  left: 0;
  right: 0;
  z-index: 6;
  background-color: white;

  .logo__section {
    width: fit-content;

    .logo__wrapper {
      width: 120px;
    }

    .nav__menu__wrapper {
      display: none;
    }
  }

  .middle__section {
    gap: 40px;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);
    flex-direction: row;
    width: fit-content;

    button {
      cursor: pointer;
      text-decoration: none;
      color: var(--orrsiBlack);
      background: none;
      border: none;
      padding: 10px 25px;
      border: 1px solid transparent;
      border-radius: 20px;
      transition: all 0.2s ease;
    }

    :hover {
      color: var(--orrsiPrimary);
    }

    #active__link {
      border: 1px solid;
      color: var(--orrsiWhite);
      border-radius: 20px;
      text-shadow: none;
      background: var(--orrsiPrimary);
    }
  }

  .right__section {
    gap: 20px;
    width: fit-content;
    position: relative;
    padding-left: 25px;

    svg {
      width: 17px;
      height: 17px !important;
    }

    .single__menu {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cart-icon-container {
      position: relative;
    }

    .cart-badge {
      position: absolute;
      top: -5px;
      right: -10px;
      background-color: red;
      color: white;
      border-radius: 50%;
      height: 16px;
      width: 16px;
      font-size: 8px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .currency__selector {
      position: relative;
      display: flex;
      align-items: center;

      .currency__trigger {
        display: flex;
        align-items: center;
        gap: 4px;
        background: none;
        border: 1px solid #e0ded3;
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--orrsiBlack);
        white-space: nowrap;
        transition: border-color 0.2s ease;

        &:hover {
          border-color: var(--orrsiPrimary);
        }

        .currency__flag {
          font-size: 1rem;
          line-height: 1;
        }

        .currency__chevron {
          font-size: 0.5rem;
          opacity: 0.6;
        }
      }

      .currency__dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: white;
        border: 1px solid #e0ded3;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        min-width: 140px;
        z-index: 10;
        overflow: hidden;

        .currency__option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--orrsiBlack);
          text-align: left;
          transition: background 0.15s ease;

          &:hover {
            background: #f5f4f0;
          }

          &.active {
            background: #f0ede4;
            font-weight: 600;
          }

          .currency__flag {
            font-size: 1rem;
            line-height: 1;
          }

          .currency__symbol {
            margin-left: auto;
            opacity: 0.5;
            font-size: 0.8rem;
          }
        }
      }
    }

    .selected__icon {
      background: var(--orrsiPrimary);
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      svg {
        color: white;
        display: flex;
        align-self: center;
        margin: 0;
        padding: 0;
        vertical-align: middle;
      }
    }

    .back__triangle {
      width: 0;
      height: 0;
      border: 15px solid transparent;
      border-top: 0;
      border-bottom: 20px solid var(--orrsiPrimary);
      position: absolute;
      top: 35px;
      right: 6px;
    }

    .account__dropdown {
      position: absolute;
      height: fit-content;
      top: 50px;
      width: 100%;
      background: var(--orrsiPrimary);
      border-radius: 10px;
      right: 0;
      padding: 20px 10px;

      p {
        margin: 0;
      }

      .header__span {
        font-size: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        width: 100%;
        padding-bottom: 8px;
        color: white;
      }

      .profile__div__wrap {
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 10px;

        .profile__span {
          font-size: 0.8rem;
          width: 100%;
          color: white;
          opacity: 0.7;
        }

        .profile {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .username {
          color: #fff;
          font-weight: 600;
        }
      }

      .auth__btn {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        min-height: fit-content;
        height: fit-content;
        padding: 0px;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        border-radius: 10px;

        span {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 10px;

          p {
            line-height: normal;
          }
        }

        &:hover {
          background: rgba(18, 18, 18, 0.16);
        }

        .btn__text {
          font-size: 1rem;
          font-weight: normal;
          color: #fff;

          svg {
            width: 12px;
            height: 12px !important;
          }
        }
      }

      .active__auth__btn {
        background: rgba(18, 18, 18, 0.16);
      }
    }
  }

  /* Header menu shrinks here */
  @media (max-width: 820px) {
    max-height: 40px;

    .logo__section .nav__menu__wrapper {
      display: flex;
    }

    .logo__section .logo__wrapper,
    .middle__section {
      display: none;
    }

    .right__section {
      gap: 18px;
    }

    .right__section .wishlist__icon {
      display: none;
    }
  }

  @media (max-width: 550px) {
    .right__section {
      .account__dropdown {
        min-width: 200px;
      }
    }
  }
`;
