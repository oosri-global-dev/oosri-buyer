import styled from "styled-components";
import { FlexibleSection } from "@/components/lib/Box/styles";

export const HeroSectionWrapper = styled(FlexibleSection)`
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;

  .welcome__image__box {
    width: 100%;
  }

  .introductory__text {
    font-size: 2.2rem;
    font-weight: 400;
    color: var(--orrsiPrimary);
  }

  .introductory__subText {
    font-size: 0.9rem;
    color: #bbb;
  }

  .category__wrapper {
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.8%;
    margin: 35px 0;
    overflow-x: auto;
    background: #fff;
    box-shadow: none;
  }

  @media (max-width: 650px) {
    .introductory__text {
      font-size: 1.5rem;
    }

    .introductory__subText {
      margin: 6px 0;
    }

    .category__wrapper {
      margin: 15px 0;
    }

    .loader__wrapper {
      flex-wrap: nowrap;
    }
  }

  @media (max-width: 280px) {
    .introductory__text {
      font-size: 1.3rem;
    }

    .introductory__subText {
      margin: 6px 0;
      font-size: 0.8rem;
    }
  }
`;
