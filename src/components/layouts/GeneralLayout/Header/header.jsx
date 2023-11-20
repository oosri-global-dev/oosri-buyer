import { FlexibleDiv } from "@/components/lib/Box/styles";
import React from "react";
import { HeaderWrapper } from "./header.styles";
import { useRouter } from "next/router";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { BsHeart as WishlistIcon } from "react-icons/bs";
import ProfileNav from "./ProfileNav/profileNav";
import NavMenu from "./navMenu/navMenu";
import { menuItems } from "@/data-helpers/header-helper";
import Logo from "@/assets/images/homepage/logo.png";
import Link from "next/link";

export default function Header() {
  const { asPath } = useRouter();

  return (
    <HeaderWrapper>
      <FlexibleDiv className="logo__section">
        <Link href={'/'}>
          <img src={Logo.src} className="logo__wrapper" alt="logo" />
        </Link>

        <div className="nav__menu__wrapper">
          <NavMenu menuItems={menuItems} />
        </div>
      </FlexibleDiv>
      <FlexibleDiv className="middle__section" flexWrap="nowrap">
        {menuItems.map((sgn, idx) => (
          <Link
            href={sgn.url.toLowerCase()}
            key={idx}
            id={`${asPath === sgn.url ? "active__link" : ""}`}
          >
            {sgn.link}
          </Link>
        ))}
      </FlexibleDiv>
      <FlexibleDiv className="right__section" flexDir="row" flexWrap="nowrap">
        <SearchIcon />
        <CartIcon />
        <WishlistIcon className="wishlist__icon" />
        <ProfileNav />
      </FlexibleDiv>
    </HeaderWrapper>
  );
}
