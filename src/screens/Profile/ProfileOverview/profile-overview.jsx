import { ProfileOverviewWrapper } from "./profile-overview.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import ProfilePic from "@/assets/images/profile/profile-1.svg";
import Image from "next/image";
import { RiLock2Line as LockIcon } from "react-icons/ri";
import { IoIosArrowRoundForward as ForwardArrowIcon } from "react-icons/io";

export default function ProfileOverview({ setCurrentPage, user }) {
  return (
    <ProfileOverviewWrapper>
      <FlexibleDiv className="avatar__wrapper">
        <img src={user?.profileImage || ProfilePic} alt="avatar" />
        <span
          className="edit__profile__btn"
          onClick={() => {
            setCurrentPage("Edit Profile");
          }}
        >
          Edit Profile
        </span>
      </FlexibleDiv>
      <p className="user__display__name">{user?.fullName}</p>
      <p className="small__span">{user?.email}</p>
      <p className="small__span">{user?.phoneNumber}</p>
      <FlexibleDiv className="product__order__stat" flexDir="column" gap="6px">
        <p className="num__of__product__order">64</p>
        <p className="product__order__text">Product Order</p>
      </FlexibleDiv>
      <FlexibleDiv
        flexDir="row"
        flexWrap="nowrap"
        justifyContent="flex-start"
        className="change__pass__btn"
        onClick={() => setCurrentPage("Change Password")}
      >
        <FlexibleDiv
          flexDir="row"
          flexWrap="nowrap"
          justifyContent="flex-start"
          gap="10px"
        >
          <div className="icon__wrapper">
            <LockIcon size={18} />
          </div>
          <FlexibleDiv flexDir="column" alignItems="flex-start">
            <p className="pass__text">Password</p>
            <p className="small__span">Change password</p>
          </FlexibleDiv>
        </FlexibleDiv>
        <ForwardArrowIcon size={25} />
      </FlexibleDiv>
    </ProfileOverviewWrapper>
  );
}
