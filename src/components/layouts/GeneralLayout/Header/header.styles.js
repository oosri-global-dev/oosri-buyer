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

    .nav__menu__wrapper {
      display: none;
    }
  }

  .middle__section {
    gap: 40px;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);
    flex-direction: row;
    width: fit-content;

    p {
      cursor: pointer;
    }

    :hover {
      color: var(--orrsiPrimary);
    }

    #active__link {
      border: 1px solid;
      color: var(--orrsiWhite);
      padding: 10px 25px;
      border-radius: 20px;
      text-shadow: none;
      background: var(--orrsiPrimary);
    }
  }

  .right__section {
    gap: 25px;
    width: fit-content;

    svg {
      width: 18px;
      height: 18px !important;
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
`;
