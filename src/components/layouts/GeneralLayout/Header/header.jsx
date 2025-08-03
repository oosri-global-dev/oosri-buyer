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
import useOutsideAlerter, { truncateString } from "@/data-helpers/hooks";
import { useMainContext } from "@/context";
import { TbLogout2 as LogoutIcon } from "react-icons/tb";
import ProfileImage from "@/assets/images/profile/profile-1.svg";
import { deleteAllCookie } from "@/data-helpers/auth-session";

export default function Header() {
  const { asPath, push } = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const unauthorizedLinks = [
    {
      label: "Login",
      link: "/login",
      icon: <ProfileIcon color="white" size={12} />,
    },
    {
      label: "Register",
      link: "/register",
      icon: <RegisterIcon color="white" size={12} />,
    },
  ];
  const authorizedLinks = [
    {
      label: "Profile",
      link: "/profile",
      icon: <ProfileIcon color="white" size={12} />,
    },
    {
      label: "Logout",
      link: "/login",
      icon: <LogoutIcon color="white" size={12} />,
    },
  ];
  const { user, cart } = useMainContext();

  //This hook helps hide the filter if an outside click is noticed
  useOutsideAlerter(dropdownRef, showDropdown, setShowDropdown);

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
          <button
            onClick={() => push(`${sgn.url.toLowerCase()}`)}
            key={idx}
            id={`${asPath === sgn.url ? "active__link" : ""}`}
          >
            {sgn.link}
          </button>
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
          className={`single__menu cart-icon-container ${
            asPath === "/cart" ? "selected__icon" : ""
          }`}
        >
          <CartIcon />
          {cart?.length > 0 && (
            <span className="cart-badge">
              {cart.length > 99 ? "99+" : cart.length}
            </span>
          )}
        </div>
        <div
          onClick={() => push("/wishlist")}
          className={`wishlist__icon single__menu ${
            asPath === "/wishlist" ? "selected__icon" : ""
          }`}
        >
          <WishlistIcon />
        </div>

        <div ref={dropdownRef}>
          <ProfileNav
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
            profilePicture={user?.profileImage || ProfileImage.src}
            loggedIn={user?.id ? true : false}
          />

          {/* popup for account dropdown */}
          {showDropdown && (
            <div style={{ display: showDropdown ? "contents" : "none" }}>
              <FlexibleDiv className="back__triangle"></FlexibleDiv>
              {user?.id ? (
                <FlexibleDiv
                  className="account__dropdown"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  gap="5px"
                >
                  <FlexibleDiv
                    flexDir="row"
                    flexWrap="nowrap"
                    className="profile__div__wrap"
                    alignItems="center"
                    gap="10px"
                  >
                    <img
                      alt="user-profile"
                      src={user?.profileImage || ProfileImage.src}
                      className="profile"
                    />
                    <FlexibleDiv
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      flexDir="column"
                    >
                      <p className="username">
                        {truncateString(user?.fullName, 25)}
                      </p>
                      <p className="profile__span">
                        Last login on {user?.lastLogin}
                      </p>
                    </FlexibleDiv>
                  </FlexibleDiv>

                  {authorizedLinks.map((lk, idx) => (
                    <Button
                      className={`auth__btn ${
                        asPath === lk.link ? "active__auth__btn" : ""
                      }`}
                      onClick={() => {
                        if (lk.link === "/login") {
                          deleteAllCookie();
                          window.open(lk.link, "_self");
                          return;
                        }
                        push(lk.link).then(setShowDropdown(false));
                      }}
                      key={idx}
                    >
                      {lk.icon}
                      <p className="btn__text">{lk.label}</p>
                    </Button>
                  ))}
                </FlexibleDiv>
              ) : (
                <FlexibleDiv
                  className="account__dropdown"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  gap="5px"
                >
                  <p className="header__span">{`Let's`} get you in!</p>
                  {unauthorizedLinks.map((lk, idx) => (
                    <Button
                      className={`auth__btn ${
                        asPath === lk.link ? "active__auth__btn" : ""
                      }`}
                      onClick={() => push(lk.link)}
                      key={idx}
                    >
                      {lk.icon}
                      <p className="btn__text">{lk.label}</p>
                    </Button>
                  ))}
                </FlexibleDiv>
              )}
            </div>
          )}
        </div>
      </FlexibleDiv>
    </HeaderWrapper>
  );
}
