import { EditProfileWrapper } from "./edit-profile.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import ProfilePic from "@/assets/images/iphone16.png";
import Image from "next/image";
import { IoCameraOutline as CameraIcon } from "react-icons/io5";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { useEffect, useState } from "react";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { Spin } from "antd";

export default function EditProfile({ setCurrentPage, user }) {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [profileImageLoading, setProfileImageLoading] = useState(true);

  const handleSaveProfile = async (values) => {};

  //profile image upload
  async function handleProfileImageChange(event) {
    const maxFileLimit = 1000000;
    let file = event.target.files[0];
    let imageType = /image.*/;

    if (!file?.type?.match(imageType)) {
      setToastMessage({
        type: "error",
        text: "Only Images are allowed. Please upload an image instead.",
      });
      return;
    }
    if (file?.size > maxFileLimit) {
      setToastMessage({
        type: "error",
        text: "File is too large, Max file size is 1mb",
      });
      return;
    }

    setProfileImageLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await updateProfileImage(formData);

      await dispatch({
        type: CURRENT_USER,
        payload: { ...user, ...data.data },
      });
      setProfileImageLoading(false);
      setShowAddImageBox(false);
    } catch (error) {
      if (error?.response) {
        setToastMessage({
          type: "error",
          text: error?.response?.data?.message,
        });
      } else {
        setToastMessage({
          type: "error",
          text: "There was an issue with your network. Pls try again later",
        });
      }
      setProfileImageLoading(false);
    }
  }

  useEffect(() => {
    form.setFieldValue("emailAddress", user?.email);
    form.setFieldValue("name", user?.fullName);
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
        <Image
          src={ProfilePic}
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
        <Form.Item name="name">
          <TextField type="text" className="move__down" borderRadius="10px" />
        </Form.Item>
        <label className="input__label">Phone Number</label>
        <Form.Item name="phoneNumber">
          <TextField type="text" className="move__down" borderRadius="10px" />
        </Form.Item>
        <label className="input__label">Email Address</label>
        <Form.Item name="emailAddress">
          <TextField type="text" className="move__down" borderRadius="10px" />
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
