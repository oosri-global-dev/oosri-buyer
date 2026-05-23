import { CgProfile as ProfileIcon } from "react-icons/cg";
import { TbLogout2 as LogoutIcon } from "react-icons/tb";
import { TbArrowBackUp as ReturnsIcon } from "react-icons/tb";
import { BsBoxSeam as OrdersIcon } from "react-icons/bs";
import { AiOutlineStar as ReviewsIcon } from "react-icons/ai";

export const accountMenuItems = [
  { icon: ProfileIcon, name: "Profile" },
  { icon: OrdersIcon,  name: "My Orders",  href: "/order" },
  { icon: ReturnsIcon, name: "My Returns", href: "/returns" },
  { icon: ReviewsIcon, name: "My Reviews", href: "/reviews" },
  { icon: LogoutIcon,  name: "Log out" },
];
