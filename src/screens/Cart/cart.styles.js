import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const CartPageWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: 100%;

  .empty__cart__box {
    height: 100%;
    width: fit-content;
    min-height: 500px;

    p {
      margin: 0;
    }

    .icon__wrapper {
      padding: 40px;
      background: #fafafa;
      border-radius: 50%;
    }

    .no__empty__text {
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
    }

    .no__empty__subtext {
      font-size: 1rem;
      font-weight: 500;
      color: #333;
    }

    button {
      border-radius: 12px;
      width: 85%;
      margin-top: 20px;
    }
  }

  .cart__section {
    margin: 15px 0;
  }
`;
