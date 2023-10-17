import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const HeaderWrapper = styled(FlexibleDiv)`
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;


  .menu__items {
    gap: 40px;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);
    flex-direction: row;

    p {
      cursor: pointer;

      :hover {
        color: red;
        text-decoration: underline;
        text-decoration-color: var(--orrsiPrimary);
      }
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
`;
