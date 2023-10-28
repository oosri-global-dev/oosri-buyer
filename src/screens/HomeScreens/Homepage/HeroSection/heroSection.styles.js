import styled from "styled-components";
import { FlexibleSection } from "@/components/lib/Box/styles";

export const HeroSectionWrapper = styled(FlexibleSection)`
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;

  .introductory__text {
    font-size: 2.2rem;
    font-weight: 400;
    color: var(--orrsiPrimary);
  }

  .introductory__subText {
    font-size: 0.9rem;
    color: #bbb;
  }

  @media (max-width: 650px) {
    .introductory__text {
      font-size: 1.5rem;
    }

    .introductory__subText {
      margin: 6px 0;
    }
  }
`;
