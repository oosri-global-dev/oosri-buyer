import { FlexibleDiv } from "@/components/lib/Box/styles";
import { NavMenuWrapper } from "./navMenu.styles";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavMenu({ menuItems }) {
  const [checked, setChecked] = useState(false);
  const { asPath } = useRouter();
  const navMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setChecked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navMenuRef]);

  return (
    <NavMenuWrapper inputChecked={checked} ref={navMenuRef}>
      <label htmlFor="nav-check">
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
          <Link
            key={idx}
            href={sgn.url}
            id={`${asPath === sgn.url ? "active__link" : ""}`}
            onClick={() => setChecked(false)}
          >
            <span>{sgn.link}</span>
          </Link>
        ))}
      </FlexibleDiv>
    </NavMenuWrapper>
  );
}
