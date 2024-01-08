import { ChangePasswordWrapper } from "./change-password.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import ProfilePic from "@/assets/images/iphone16.png";
import Image from "next/image";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { useState } from "react";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function ChangePassword({ setCurrentPage }) {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChangePassword = async (values) => {};

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
        <Image src={ProfilePic} alt="avatar" />
      </FlexibleDiv>
      <Form className="form__box" form={form} onFinish={handleChangePassword}>
        <label className="input__label">Current Password</label>
        <Form.Item name="currentPassword">
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
