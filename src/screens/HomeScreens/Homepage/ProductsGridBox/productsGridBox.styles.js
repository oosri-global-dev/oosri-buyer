import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const SDWrapper = styled(FlexibleDiv)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  width: 100%;
  margin-top: 20px;
  align-items: start;

  .top__section__container {
    grid-column: 1 / -1;
    margin-bottom: 4px;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .view__all__style {
    font-size: 1.1rem;
    color: #757575;
    cursor: pointer;
    margin: 0;
    text-decoration: none;
  }

  @media (max-width: 440px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

    h2 {
      font-size: 1.2rem;
    }

    .view__all__style {
      font-size: 1rem;
    }
  }
`;
