import { FlexibleDiv } from "../Box/styles";
import styled from "styled-components";

const OorsiLoaderWrapper = styled(FlexibleDiv)`
  padding: 40px 0;
  .loader__image {
    width: 700px;
  }

  @media (max-width: 768px) {
    .loader__image {
      width: 100%;
    }
  }
`;

export default function OorsiLoader() {
  return (
    <OorsiLoaderWrapper>
      <img
        className="loader__image"
        src="/images/product/loader.gif"
        alt="loader"
      />
    </OorsiLoaderWrapper>
  );
}
