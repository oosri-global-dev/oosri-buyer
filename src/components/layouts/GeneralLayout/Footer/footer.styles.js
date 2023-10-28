import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const FooterWrapper = styled(FlexibleDiv)`
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
  }
`;
