import { BreadcrumbWrapper } from "./breadcrumb.styles";
import Image from "next/image";
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
        <Image
          alt="banner"
          src={"/images/shop/shop-banner.gif"}
          layout="fill"
          objectFit="cover"
        />
      </FlexibleDiv>
      {numOfProducts && (
        <p className="breadcrumb__paragraph">{numOfProducts} Products Found</p>
      )}
    </BreadcrumbWrapper>
  );
}
