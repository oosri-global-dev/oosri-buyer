import { EditProfileWrapper } from "./edit-profile.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import ProfilePic from "@/assets/images/profile/profile-1.svg";
import Image from "next/image";
import { IoCameraOutline as CameraIcon } from "react-icons/io5";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { useEffect, useState } from "react";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { Spin } from "antd";
import { CURRENT_USER, TOAST_BOX } from "@/context/types";
import { updateProfileImage, updateUserProfile } from "@/network/user";

export default function EditProfile({ setCurrentPage, user, dispatch }) {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [profileImageLoading, setProfileImageLoading] = useState(false);

  const handleSaveProfile = async (values) => {
    if (values?.fullName?.toString().trim().length < 5) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Full name cannot be less than 5 characters",
        },
      });
      return;
    }

    setLoadingBtn(true);

    try {
      const res = await updateUserProfile(values);

      //message
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: res?.message,
        },
      });

      //update the dispatch
      dispatch({
        type: CURRENT_USER,
        payload: { ...user, ...values },
      });
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occured",
        },
      });
    }

    setLoadingBtn(false);
  };

  //profile image upload
  async function handleProfileImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const maxFileLimit = 1000000; // 1MB
    const imageType = /^image\//;

    if (!imageType.test(file.type)) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Only Images are allowed. Please upload an image instead.",
        },
      });
      return;
    }

    if (file.size > maxFileLimit) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "File is too large, Max file size is 1MB",
        },
      });
      return;
    }

    setProfileImageLoading(true);

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const data = await updateProfileImage(formData);

      dispatch({
        type: CURRENT_USER,
        payload: { ...user, ...data?.body },
      });

      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: "Profile image updated successfully",
        },
      });

      setProfileImageLoading(false);
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: error?.response?.data?.message || "Sorry, an error occurred",
        },
      });

      setProfileImageLoading(false);
    }
  }

  useEffect(() => {
    form.setFieldValue("email", user?.email);
    form.setFieldValue("fullName", user?.fullName);
    form.setFieldValue("phoneNumber", user?.phoneNumber);
  }, [user]);

  return (
    <EditProfileWrapper>
      <FlexibleDiv
        className="top__nav"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <div
          className="left__section"
          onClick={() => setCurrentPage("Profile Overview")}
        >
          <BackArrow size={20} />
          Go back
        </div>
        <h2>Edit Profile</h2>
      </FlexibleDiv>
      <FlexibleDiv className="avatar__wrapper">
        <img
          src={user?.profileImage || ProfilePic}
          alt="avatar"
          style={{ opacity: profileImageLoading ? "0.3" : "1" }}
        />
        {profileImageLoading && (
          <Spin wrapperClassName="spin__box" size="large" tip="Uploading">
            <div className="content" />
          </Spin>
        )}
        <label className="upload__image__btn" htmlFor="addProfileImage">
          <CameraIcon size={16} />
          Upload
          <input
            hidden
            type="file"
            id={"addProfileImage"}
            name="file"
            onChange={handleProfileImageChange}
          />
        </label>
      </FlexibleDiv>
      <Form className="form__box" form={form} onFinish={handleSaveProfile}>
        <label className="input__label">Name</label>
        <Form.Item name="fullName">
          <TextField
            type="text"
            className="move__down"
            borderRadius="10px"
            required
          />
        </Form.Item>
        <label className="input__label">Phone Number</label>
        <Form.Item name="phoneNumber">
          <TextField
            type="text"
            className="move__down"
            borderRadius="10px"
            required
          />
        </Form.Item>
        <label className="input__label">Email Address</label>
        <Form.Item name="email">
          <TextField
            type="email"
            className="move__down"
            borderRadius="10px"
            required
          />
        </Form.Item>
        <Button
          width="100%"
          backgroundColor="var(--orrsiPrimary)"
          type="submit"
          htmlType="submit"
          color="var(--orrsiWhite)"
          radius="10px"
          margin="15px 0 0 0"
          loading={loadingBtn}
        >
          Save Changes
        </Button>
      </Form>
    </EditProfileWrapper>
  );
}
