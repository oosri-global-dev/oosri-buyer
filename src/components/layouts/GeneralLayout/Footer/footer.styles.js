import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const FooterWrapper = styled(FlexibleDiv)`
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  background: #fbfbfb;

  .bottom__section {
    margin: 10px 0;
  }
`;

export const TopSectionWrapper = styled(FlexibleDiv)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
  height: fit-content;
  background: #fbfbfb;
  box-sizing: border-box;
  padding: 30px;

  .section__box {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    h3 {
      color: #333333;
      font-weight: 600;
      margin: 10px 0;
      transition: 0.5s;
    }

    .single__link {
      text-decoration: none;
      color: #333333;
      margin: 10px 0;
      transition: 0.5s;

      &:hover {
        color: var(--orrsiPrimary);
      }
    }

    &:hover {
      h3 {
        color: var(--orrsiPrimary);
      }
    }
  }

  .box__4 {
    gap: 7px;

    img {
      width: 200px;
    }
  }

  
  @media (max-width: 440px) {
    flex-wrap: wrap;
    .box__1 {
      flex-grow: 4;
      margin-bottom: 30px;
    }

    .box__2,
    .box__3 {
      flex-grow: 2;
      width: fit-content;
      margin-bottom: 30px;

      h3,
      a {
        width: fit-content;
      }
    }
  }
`;

