import { FlexibleDiv } from "@/components/lib/Box/styles";
import React, { useState, useRef, useEffect } from "react";
import { HeaderWrapper } from "./header.styles";
import { useRouter } from "next/router";
import Image from "next/image";
import { FiSearch as SearchIcon } from "react-icons/fi";
import SearchOverlay from "@/components/lib/SearchOverlay/SearchOverlay";
import { AiOutlineShoppingCart as ShopCartIcon } from "react-icons/ai";
import { BsHeart as WishlistIcon } from "react-icons/bs";
import { HiOutlineBellAlert as NotificationIcon } from "react-icons/hi2";
import ProfileNav from "./ProfileNav/profileNav";
import CurrencySelector from "./CurrencySelector";
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
import { BsBoxSeam as OrdersIcon } from "react-icons/bs";
import { TbArrowBackUp as ReturnsIcon } from "react-icons/tb";
import { AiOutlineStar as ReviewsIcon } from "react-icons/ai";
import ProfileImage from "@/assets/images/profile/profile-1.svg";
import { deleteAllCookie } from "@/data-helpers/auth-session";
import { logoutUser } from "@/network/auth";
import { Popover, Badge } from "antd";
import { useBuyerNotifications } from "@/hooks/useBuyerNotifications";
import NotificationPanel from "@/components/lib/NotificationPanel";

export default function Header() {
  const { asPath, push } = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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
      label: "My Orders",
      link: "/order",
      icon: <OrdersIcon color="white" size={12} />,
    },
    {
      label: "My Returns",
      link: "/returns",
      icon: <ReturnsIcon color="white" size={12} />,
    },
    {
      label: "My Reviews",
      link: "/reviews",
      icon: <ReviewsIcon color="white" size={12} />,
    },
    {
      label: "Logout",
      link: "/login",
      icon: <LogoutIcon color="white" size={12} />,
    },
  ];
  const { user, cart } = useMainContext();
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, unreadCount, isLoading, markRead, markAllRead, remove } = useBuyerNotifications(!!user?.id);

  //This hook helps hide the filter if an outside click is noticed
  useOutsideAlerter(dropdownRef, showDropdown, setShowDropdown);

  return (
    <HeaderWrapper>
      <FlexibleDiv className="logo__section">
        <div className="nav__menu__wrapper">
          <NavMenu menuItems={menuItems} />
        </div>
        <Link href={"/"}>
          <Image src={Logo} className="logo__wrapper" alt="logo" width={120} height={40} style={{ objectFit: "contain" }} />
        </Link>
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
        <CurrencySelector />
        <div
          onClick={() => setShowSearch(true)}
          className={`single__menu ${showSearch ? "selected__icon" : ""}`}
          role="button"
          aria-label="Open search"
        >
          <SearchIcon />
        </div>
        <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />
        <div
          onClick={() => push("/cart")}
          className={`single__menu cart-icon-container ${
            asPath === "/cart" ? "selected__icon" : ""
          }`}
        >
          <ShopCartIcon />
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

        {user?.id && (
          <Popover
            open={notifOpen}
            onOpenChange={setNotifOpen}
            trigger="click"
            placement="bottomRight"
            arrow={false}
            content={
              <NotificationPanel
                notifications={notifications}
                unreadCount={unreadCount}
                isLoading={isLoading}
                onRead={(id) => markRead(id)}
                onMarkAllRead={() => markAllRead()}
                onDelete={(id) => remove(id)}
              />
            }
          >
            <div className="single__menu notif__icon__wrap">
              <Badge count={unreadCount} size="small" color="#ef4444">
                <NotificationIcon size={20} />
              </Badge>
            </div>
          </Popover>
        )}

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
                    <Image
                      alt="user-profile"
                      src={user?.profileImage || ProfileImage}
                      className="profile"
                      width={45}
                      height={45}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
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
                      onClick={async () => {
                        if (lk.link === "/login") {
                          try {
                            await logoutUser();
                          } catch (_error) {}
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
