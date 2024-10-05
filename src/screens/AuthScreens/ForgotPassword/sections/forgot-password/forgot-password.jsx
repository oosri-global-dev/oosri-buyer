import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ForgotPasswordWrapper } from "./forgot-password.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { forgotPassword } from "@/network/auth";
import { useState } from "react";
import { TOAST_BOX } from "@/context/types";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";

export default function ForgotPassword({ setStep }) {
  const [form] = Form.useForm();
  const { dispatch } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const appendParams = (newParams) => {
    const pathname = router.pathname;
    const query = { ...router.query, ...newParams };

    router.push(
      {
        pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword({ email: values?.email?.trim() });
      //message
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: res?.message,
        },
      });

      setTimeout(() => {
        appendParams({ email: encodeURIComponent(values?.email?.trim()) });
        setStep(2);
      }, 1200);
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occured",
        },
      });
      setIsLoading(false);
    }
    console.log("values", values);
  };

  return (
    <AuthWrapper>
      <ForgotPasswordWrapper>
        <FlexibleDiv className="lock__icon__wrapper">
          <LockIcon size={40} color="var(--orrsiPrimary)" />
        </FlexibleDiv>
        <FlexibleDiv
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <h2>Forgot Password</h2>
          <p className="header__sub__text">
            Enter the email you used to create your account <br />
            so we can send you a code
          </p>
        </FlexibleDiv>
        <Form form={form} onFinish={handleSubmit}>
          <FlexibleDiv
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir="column"
          >
            <label className="input__label">Email Address</label>
            <Form.Item name="email" required>
              <TextField type="email" borderRadius="10px" required />
            </Form.Item>
            <Button
              width="100%"
              backgroundColor="var(--orrsiPrimary)"
              type="submit"
              htmlType="submit"
              color="var(--orrsiWhite)"
              radius="10px"
              margin="15px 0 0 0"
              loading={isLoading}
            >
              Send
            </Button>
          </FlexibleDiv>
        </Form>
      </ForgotPasswordWrapper>
    </AuthWrapper>
  );
}
