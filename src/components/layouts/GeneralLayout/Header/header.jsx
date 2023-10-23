import { FlexibleDiv } from "@/components/lib/Box/styles";
import React from "react";
import { HeaderWrapper } from "./header.styles";
import { useRouter } from "next/router";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { BsHeart as WishlistIcon } from "react-icons/bs";
import ProfileNav from "./ProfileNav/profileNav";

export default function Header() {
  const { asPath } = useRouter();

  const menuItems = [
    { link: "Home", url: "/" },
    { link: "Shop", url: "/shop" },
    { link: "New Arrivals", url: "/new-arrivals" },
    { link: "Order", url: "/order" },
  ];

  return (
    <HeaderWrapper>
      <FlexibleDiv className="logo__section">LOGO</FlexibleDiv>
      <FlexibleDiv className="middle__section" flexWrap="nowrap">
        {menuItems.map((sgn, idx) => (
          <p key={idx} id={`${asPath === sgn.url ? "active__link" : ""}`}>
            {sgn.link}
          </p>
        ))}
      </FlexibleDiv>
      <FlexibleDiv className="right__section" flexDir="row" flexWrap="nowrap">
        <SearchIcon />
        <CartIcon />
        <WishlistIcon />
        <ProfileNav />
      </FlexibleDiv>
    </HeaderWrapper>
  );
}
