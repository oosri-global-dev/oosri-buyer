import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ProfileOverviewWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: inherit;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 40px;
  flex-basis: 100%;

  .small__span {
    color: #999;
    font-size: 0.85rem;
    margin: 2px 0;
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

    .edit__profile__btn {
      position: absolute;
      color: var(--orrsiPrimary);
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      bottom: -10px;
      z-index: 9999;
      cursor: pointer;
      transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);

      &:hover {
        background: rgba(254, 221, 221, 0.8);
        color: var(--orrsiPrimary);
      }
    }
  }

  p {
    margin: 0;
  }

  .user__display__name {
    margin: 25px 0px 5px 0;
    font-size: 1.4rem;
  }

  .product__order__stat {
    border-radius: 12px;
    border: 1.5px solid var(--Text-Greg-200, #eee);
    background: var(--Text-White, #fff);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
      0px -1px 2px 0px rgba(0, 0, 0, 0.1) inset;
    padding: 7px 0;
    width: 50%;
    margin: 20px 0;

    p {
      margin: 0;
    }

    .num__of__product__order {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .product__order__text {
      font-size: 0.8rem;
      color: #999;
    }
  }

  .change__pass__btn {
    border-radius: 12px;
    background: #fafafa;
    width: 50%;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);

    &:hover {
      background: rgba(254, 221, 221, 0.8);
    }

    .icon__wrapper {
      background: white;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      padding: 5px;
    }

    .pass__text {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 550px) {
    margin-top: 60px;

    .product__order__stat,
    .change__pass__btn {
      width: 90%;
    }

    .change__pass__btn {
      padding: 10px;
    }
  }
`;
