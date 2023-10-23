import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ProfileNavWrapper } from "./profileNav.styles";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import ProfileImage from '@/assets/images/profile-image.png'

export default function ProfileNav() {
  return (
    <ProfileNavWrapper>
      <img src={ProfileImage.src} alt="" />
      <ArrowDown />
    </ProfileNavWrapper>
  );
}
