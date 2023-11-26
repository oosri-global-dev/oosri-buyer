import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ResetSuccessPageWrapper = styled(FlexibleDiv)`
  height: 100%;
  flex-direction: column;
  max-width: 450px;
  gap: 30px;

  .check__icon__wrapper {
    background-color: var(--orrsiPrimary);
    width: fit-content;
    padding: 30px;
    border-radius: 50%;
  }

  h2 {
    color: var(--orrsiPrimary);
    text-align: center;
  }

  .header__sub__text {
    font-size: 0.9rem;
    color: #777;
    text-align: center;
  }

  button {
    width: 65%;
  }

`;
