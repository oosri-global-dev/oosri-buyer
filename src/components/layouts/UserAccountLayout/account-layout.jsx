import { FlexibleDiv } from "@/components/lib/Box/styles";
import { AccountLayoutWrapper } from "./account-layout.styles";
import { accountMenuItems } from "@/data-helpers/profile-helper";
import { useState } from "react";

export default function AccountLayout({ children }) {
  const [activeMenu, setActiveMenu] = useState("Profile");

  const routeToView = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <AccountLayoutWrapper>
      <FlexibleDiv
        className="profile__navigation"
        flexDir="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <h1>My Account</h1>
        <FlexibleDiv
          className="menu__wrapper"
          flexDir="column"
          alignItems="flex-start"
        >
          {accountMenuItems.map((sgn, idx) => (
            <FlexibleDiv
              className={`${
                activeMenu === sgn.name
                  ? "nav__menu active__background"
                  : "nav__menu"
              }`}
              flexWrap="nowrap"
              justifyContent="flex-start"
              alignItems="center"
              gap="8px"
              key={idx}
              onClick={() => routeToView(sgn.name)}
            >
              <sgn.icon
                color={`${
                  activeMenu === sgn.name ? "var(--orrsiPrimary)" : "#999999"
                }`}
                size={18}
              />
              <p className={`${activeMenu === sgn.name ? "active__menu" : ""}`}>
                {sgn.name}
              </p>
            </FlexibleDiv>
          ))}
        </FlexibleDiv>
      </FlexibleDiv>
      <FlexibleDiv className="profile__content">
        {children}
      </FlexibleDiv>
    </AccountLayoutWrapper>
  );
}
