import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ResetPasswordWrapper } from "./reset-page.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { useState } from "react";
import { resetPassword } from "@/network/auth";
import { useRouter } from "next/router";
import { useMainContext } from "@/context";
import { TOAST_BOX } from "@/context/types";

export default function ResetPassword({ setStep }) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const { dispatch } = useMainContext();

  const handleSubmit = async (values) => {
    setIsLoading(true);

    const payload = {
      email: decodeURIComponent(query?.email),
      otp: decodeURIComponent(query?.otp),
      ...values,
    };

    try {
      const res = await resetPassword(payload);

      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: res?.message,
        },
      });

      setTimeout(() => {
        setStep(2);
      }, 4000);
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occured",
        },
      });

      if (err?.response?.data?.message === "Otp code has Expired") {
        setTimeout(() => {
          push("/forgot-password");
        }, 4000);
      }
      setIsLoading(false);
    }
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match!"));
    },
  });

  return (
    <AuthWrapper>
      <ResetPasswordWrapper>
        <FlexibleDiv className="lock__icon__wrapper">
          <LockIcon size={40} color="var(--orrsiPrimary)" />
        </FlexibleDiv>
        <FlexibleDiv
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <h2>Reset Password</h2>
          <p className="header__sub__text">
            Choose a new password for your account
          </p>
        </FlexibleDiv>
        <Form form={form} onFinish={handleSubmit}>
          <FlexibleDiv
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir="column"
          >
            <label className="input__label">New Password</label>
            <Form.Item
              name="newPassword"
              style={{ marginBottom: "20px" }}
              rules={[
                { required: true, message: "Please input your new password!" },
                {
                  min: 5,
                  message: "Password must be at least 5 characters long",
                },
              ]}
            >
              <TextField.Password
                className="password__style"
                type="password"
                borderRadius="10px"
              />
            </Form.Item>
            <label className="input__label">Confirm Password</label>
            <Form.Item
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                validateConfirmPassword,
              ]}
            >
              <TextField.Password
                className="password__style"
                type="password"
                borderRadius="10px"
              />
            </Form.Item>
            <Button
              width="100%"
              backgroundColor="var(--orrsiPrimary)"
              type="submit"
              htmlType="submit"
              color="var(--orrsiWhite)"
              radius="10px"
              margin="20px 0 0 0"
              loading={isLoading}
            >
              Reset Password
            </Button>
          </FlexibleDiv>
        </Form>
      </ResetPasswordWrapper>
    </AuthWrapper>
  );
}
