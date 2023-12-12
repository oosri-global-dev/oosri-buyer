import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ProfileNavWrapper } from "./profileNav.styles";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import ProfileImage from '@/assets/images/profile.svg'

export default function ProfileNav({ setShowDropdown, showDropdown }) {
  return (
    <ProfileNavWrapper onClick={() => setShowDropdown(!showDropdown)}>
      <img src={ProfileImage.src} alt="" />
      <ArrowDown />
    </ProfileNavWrapper>
  );
}
