import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const NFWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 60px 0;
  gap: 20px;

  .not__found__image {
    width: 55%;
    height: 100%;
  }

  .not__found__text {
    width: 55%;
    text-align: center;
    color: #999999;
    font-size: 1.1rem;
  }

  @media (max-width: 550px) {
    .not__found__image {
      width: 85%;
    }

    .not__found__text {
      width: 95%;
      font-size: 0.9rem;
    }
  }
`;
