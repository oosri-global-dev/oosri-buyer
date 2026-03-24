import { FlexibleDiv } from "../Box/styles";
import styled from "styled-components";
import Image from "next/image";

const OorsiLoaderWrapper = styled(FlexibleDiv)`
  padding: 40px 0;
  .loader__image {
    width: 700px;
    height: auto;
  }

  @media (max-width: 768px) {
    .loader__image {
      width: 100%;
      height: auto;
    }
  }
`;

export default function OorsiLoader() {
  return (
    <OorsiLoaderWrapper>
      <Image
        className="loader__image"
        src="/images/product/loader.gif"
        alt="loader"
        width={700}
        height={400}
        unoptimized
      />
    </OorsiLoaderWrapper>
  );
}
