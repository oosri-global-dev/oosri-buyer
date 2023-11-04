import { BreadcrumbWrapper } from "./breadcrumb.styles";
import Image from "next/image";
import BannerImage from "@/assets/images/banner-image.svg";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useState } from "react";

export default function Breadcrumb({ numOfProducts }) {
  const [firstBC, setFirstBC] = useState("Products");
  return (
    <BreadcrumbWrapper>
      <p className="breadcrumb__paragraph">
        Home / <span>{firstBC} </span>
      </p>
      <FlexibleDiv className="banner__wrapper">
        <Image alt="banner" src={BannerImage} />
      </FlexibleDiv>
      {numOfProducts && (
        <p className="breadcrumb__paragraph">{numOfProducts} Products Found</p>
      )}
    </BreadcrumbWrapper>
  );
}
