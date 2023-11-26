import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const ResetPasswordWrapper = styled(FlexibleDiv)`
  height: 100%;
  flex-direction: column;
  max-width: 350px;
  gap: 30px;

  .lock__icon__wrapper {
    background-color: #fedddd40;
    width: fit-content;
    padding: 30px;
    border-radius: 50%;
  }

  .header__sub__text {
    font-size: 0.9rem;
    color: #777;
    text-align: center;
  }

  .input__label {
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  .password__style {
    width: 100%;
    margin: 0;
    height: 45px;
    border: 0.5px solid #e0ded3;
    border-radius: 10px;
  }
`;
