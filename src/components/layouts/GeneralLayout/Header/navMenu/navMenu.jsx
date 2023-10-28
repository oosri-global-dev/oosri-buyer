import { FlexibleDiv } from "@/components/lib/Box/styles";
import { NavMenuWrapper } from "./navMenu.styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NavMenu({ menuItems }) {
  const [checked, setChecked] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    if (checked) {
      //Apply style to disable scrolling background elements
      document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("BODY")[0].style.overflow = "scroll";
    }
  }, [checked]);

  return (
    <NavMenuWrapper inputChecked={checked}>
      <label for="nav-check">
        <input
          type="checkbox"
          className="nav__menu__input"
          id="nav-check"
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* The navigation menus */}
      <FlexibleDiv className="nav__content__wrapper">
        {menuItems.map((sgn, idx) => (
          <p key={idx} id={`${asPath === sgn.url ? "active__link" : ""}`}>
            {sgn.link}
          </p>
        ))}
      </FlexibleDiv>
    </NavMenuWrapper>
  );
}
