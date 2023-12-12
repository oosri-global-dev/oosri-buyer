import { FlexibleDiv } from "@/components/lib/Box/styles";
import React, { useState, useRef, useEffect } from "react";
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
import { CgProfile as ProfileIcon } from "react-icons/cg";
import { HiOutlineUserPlus as RegisterIcon } from "react-icons/hi2";
import Button from "@/components/lib/Button";
import useOutsideAlerter from "@/data-helpers/hooks";

export default function Header() {
  const { asPath, push } = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  //This hook helps hide the filter if an outside click is noticed
  useOutsideAlerter(dropdownRef, showDropdown, setShowDropdown);

  useEffect(() => {
    console.log("e", showDropdown);
  }, [showDropdown]);

  console.log(asPath);

  return (
    <HeaderWrapper>
      <FlexibleDiv className="logo__section">
        <Link href={"/"}>
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
        <div
          onClick={() => push("/search")}
          className={`single__menu ${
            asPath === "/search" ? "selected__icon" : ""
          }`}
        >
          <SearchIcon />
        </div>
        <div
          onClick={() => push("/cart")}
          className={`single__menu ${
            asPath === "/cart" ? "selected__icon" : ""
          }`}
        >
          <CartIcon />
        </div>
        <div
          onClick={() => push("/wishlist")}
          className={`wishlist__icon single__menu ${
            asPath === "/wishlist" ? "selected__icon" : ""
          }`}
        >
          <WishlistIcon />
        </div>

        <ProfileNav
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          ref={dropdownRef}
        />
        {/* popup for account dropdown */}
        <div style={{ display: showDropdown ? "contents" : "none" }}>
          <FlexibleDiv className="back__triangle"></FlexibleDiv>
          <FlexibleDiv
            className="account__dropdown"
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start"
            gap="5px"
          >
            <p className="header__span">{`Let's`} get you in!</p>
            <Button
              className="auth__btn"
              backgroundColor="rgba(18, 18, 18, 0.16)"
              onClick={() => push("/login")}
            >
              <ProfileIcon color="white" size={12} />
              <p className="btn__text">Login</p>
            </Button>
            <Button className="auth__btn" onClick={() => push("/register")}>
              <RegisterIcon color="white" size={12} />
              <p className="btn__text">Register</p>
            </Button>
          </FlexibleDiv>
        </div>
      </FlexibleDiv>
    </HeaderWrapper>
  );
}
