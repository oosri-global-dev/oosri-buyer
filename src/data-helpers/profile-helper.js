import { CgProfile as ProfileIcon } from "react-icons/cg";
import { TbLogout2 as LogoutIcon } from "react-icons/tb";
import { TbArrowBackUp as ReturnsIcon } from "react-icons/tb";

export const accountMenuItems = [
  { icon: ProfileIcon, name: "Profile" },
  { icon: ReturnsIcon, name: "My Returns", href: "/returns" },
  { icon: LogoutIcon, name: "Log out" },
];
