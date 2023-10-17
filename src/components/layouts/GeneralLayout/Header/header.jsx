import { FlexibleDiv } from "@/components/lib/Box/styles";
import React from "react";
import { HeaderWrapper } from "./header.styles";
import { useRouter } from "next/router";

export default function Header() {
  const { asPath } = useRouter();

  console.log(asPath);

  const menuItems = [
    { link: "Home", url: "/" },
    { link: "Shop", url: "/shop" },
    { link: "New Arrivals", url: "/new-arrivals" },
    { link: "Order", url: "/order" },
    { link: "Sell on Lorem", url: "/sell-on-lorem" },
  ];

  return (
    <HeaderWrapper>
      <FlexibleDiv>A</FlexibleDiv>
      <FlexibleDiv className="menu__items" flexWrap='nowrap'>
        {menuItems.map((sgn, idx) => (
          <p key={idx} id={`${asPath === sgn.url ? 'active__link' : ''}`}>
            {sgn.link}
          </p>
        ))}
      </FlexibleDiv>
      <FlexibleDiv>B</FlexibleDiv>
    </HeaderWrapper>
  );
}
