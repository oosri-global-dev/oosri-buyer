import styled from "styled-components";
import { FlexibleDiv } from "../../Box/styles";

export const SingleCardWrapper = styled(FlexibleDiv)`
  justify-content: flex-start;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.04);

  .img__wrapper {
    width: fit-content;

    img {
      object-fit: cover;
      width: 70px;
    }
  }

  .product__info {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;

    p {
      margin: 0;
    }
  }
`;
