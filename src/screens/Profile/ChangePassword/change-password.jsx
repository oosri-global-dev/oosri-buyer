import { ChangePasswordWrapper } from "./change-password.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import ProfilePic from "@/assets/images/profile/profile-1.svg";
import Image from "next/image";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { useState } from "react";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { TOAST_BOX } from "@/context/types";
import { changeUserPassword } from "@/network/user";

export default function ChangePassword({ setCurrentPage, user, dispatch }) {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChangePassword = async (values) => {
    if (values?.oldPassword?.length < 5 || values?.newPassword?.length < 5) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Passwords cannot be less than 5 characters",
        },
      });
      return;
    }

    setLoadingBtn(true);

    try {
      const res = await changeUserPassword(values);

      //message
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: res?.message,
        },
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

  return (
    <ChangePasswordWrapper>
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
        <h2>Change Password</h2>
      </FlexibleDiv>
      <FlexibleDiv className="avatar__wrapper">
        <img src={user?.profileImage || ProfilePic} alt="avatar" />
      </FlexibleDiv>
      <Form className="form__box" form={form} onFinish={handleChangePassword}>
        <label className="input__label">Current Password</label>
        <Form.Item name="oldPassword">
          <TextField.Password
            type="password"
            autoComplete="new-password"
            className="password__style move__down"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <label className="input__label">New Password</label>
        <Form.Item name="newPassword">
          <TextField.Password
            type="password"
            autoComplete="new-password"
            className="password__style move__down"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
    </ChangePasswordWrapper>
  );
}
