import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ResetPasswordWrapper } from "./reset-page.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";

export default function ResetPassword({ setStep }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("values", values);
    setStep(2);
  };

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
            <Form.Item name="newPassword" style={{ marginBottom: "20px" }}>
              <TextField.Password
                className="password__style"
                type="password"
                borderRadius="10px"
              />
            </Form.Item>
            <label className="input__label">Confirm Password</label>
            <Form.Item name="confirmPassword">
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
            >
              Reset Password
            </Button>
          </FlexibleDiv>
        </Form>
      </ResetPasswordWrapper>
    </AuthWrapper>
  );
}
