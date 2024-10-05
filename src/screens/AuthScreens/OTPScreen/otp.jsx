/* eslint-disable react/no-unescaped-entities */
import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { CheckEmailWrapper } from "./otp.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { confirmOTP, resendOTP } from "@/network/auth";
import { TOAST_BOX } from "@/context/types";
import { useMainContext } from "@/context";
import { storeDataInCookie } from "@/data-helpers/auth-session";

export default function OTP() {
  const [form] = Form.useForm();
  const { push, query } = useRouter();
  const [isResending, setIsResending] = useState(false);
  const { dispatch } = useMainContext();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    let fieldIntIndex = parseInt(fieldIndex, 10);

    // Limit input to one character
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);
    }

    // If a character is entered, move to next field
    if (value.length === 1) {
      if (fieldIntIndex < 4) {
        const nextfield = document.querySelector(
          `input[name=box-${fieldIntIndex + 1}]`
        );
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    const { key, target } = e;
    const { name, value } = target;
    const [fieldName, fieldIndex] = name.split("-");
    let fieldIntIndex = parseInt(fieldIndex, 10);

    if (key === "Backspace" && value === "") {
      e.preventDefault();
      if (fieldIntIndex > 1) {
        const prevField = document.querySelector(
          `input[name=box-${fieldIntIndex - 1}]`
        );
        if (prevField !== null) {
          prevField.focus();
        }
      }
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);

    try {
      const res = await resendOTP({ email: decodeURIComponent(query?.email) });
      setIsResending(false);

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
      setIsResending(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const payload = {
      otp: values.box1 + values.box2 + values.box3 + values.box4,
      email: decodeURIComponent(query?.email),
    };

    try {
      const res = await confirmOTP(payload);

      //set token
      storeDataInCookie("access_token", res?.body?.accessToken);
      storeDataInCookie("refresh_token", res?.body?.refreshToken);

      //message
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: "Email verified successfully.",
        },
      });

      //direct inside the app
      setTimeout(() => {
        window.open(`/`, "_self");
      }, 3000);
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occured",
        },
      });
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, 1);
  };

  return (
    <AuthWrapper isAuth={false}>
      <CheckEmailWrapper>
        <FlexibleDiv className="lock__icon__wrapper">
          <LockIcon size={40} color="var(--orrsiPrimary)" />
        </FlexibleDiv>
        <FlexibleDiv
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <h2>Check your email</h2>
          <p className="header__sub__text">
            We've sent a code to{" "}
            {decodeURIComponent(query?.email) || "invalid email.."}
          </p>
        </FlexibleDiv>
        <Form form={form} onFinish={handleSubmit}>
          <FlexibleDiv
            alignItems="flex-start"
            justifyContent="space-between"
            flexDir="row"
            flexWrap="nowrap"
            gap="20px"
          >
            {[1, 2, 3, 4].map((index) => (
              <Form.Item key={index} name={`box${index}`}>
                <TextField
                  className="single__box"
                  type="number"
                  name={`box-${index}`}
                  borderRadius="10px"
                  maxLength={1}
                  showCount={false}
                  onInput={handleInput}
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Form.Item>
            ))}
          </FlexibleDiv>
          <p className="header__sub__text resend__text">
            Didn't get a code?{" "}
            {isResending ? (
              <span>Resending OTP</span>
            ) : (
              <span
                style={{ textDecoration: "underline" }}
                onClick={() => handleResendOTP()}
              >
                Click to resend
              </span>
            )}
          </p>

          <Button
            width="100%"
            backgroundColor="var(--orrsiPrimary)"
            type="submit"
            htmlType="submit"
            color="var(--orrsiWhite)"
            radius="10px"
            margin="15px 0 0 0"
            loading={loading}
          >
            Send
          </Button>
        </Form>
      </CheckEmailWrapper>
    </AuthWrapper>
  );
}
