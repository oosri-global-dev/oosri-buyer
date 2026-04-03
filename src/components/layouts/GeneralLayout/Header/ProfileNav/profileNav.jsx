import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ProfileNavWrapper } from "./profileNav.styles";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import ProfileImage from '@/assets/images/profile.svg'
import Image from "next/image";

export default function ProfileNav({
  setShowDropdown,
  showDropdown,
  profilePicture,
  loggedIn,
}) {
  return (
    <ProfileNavWrapper onClick={() => setShowDropdown(!showDropdown)}>
      <Image
        src={loggedIn ? profilePicture : ProfileImage}
        alt="profile"
        width={40}
        height={40}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      <ArrowDown />
    </ProfileNavWrapper>
  );
}
