import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const BreadcrumbWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: fit-content;
  justify-content: flex-start;
  margin: 20px 0px 0px 0px;

  .breadcrumb__paragraph {
    font-size: 0.95rem;
    color: var(--orrsiFadedWhite);
    cursor: pointer;
    margin: 0;
    margin: 20px 0;

    span {
      color: var(--orrsiSecondaryBlack);
      font-weight: 600;
    }
  }

  .banner__wrapper {
    width: 100%;
    height: 120px;

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }

  @media (max-width: 540px) {
    .banner__wrapper {
      height: fit-content;
      img {
        object-fit: contain;
      }
    }
  }
`;
