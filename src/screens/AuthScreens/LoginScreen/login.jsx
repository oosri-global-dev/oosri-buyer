import { LoginWrapper } from "./login.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Form } from "antd";
import Button from "@/components/lib/Button";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import TextField from "@/components/lib/TextField";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/network/auth";
import { validatePassword } from "@/data-helpers/validator";
import toast, { Toaster } from "react-hot-toast";
import { useMainContext } from "@/context";
import { TOAST_BOX } from "@/context/types";
import { useRouter } from "next/router";
import { storeDataInCookie } from "@/data-helpers/auth-session";
import { loginActions } from "@/utils/user-actions";
import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Logo from "@/assets/images/homepage/logo.png";

function LoginForm() {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { dispatch } = useMainContext();
  const { push, query } = useRouter();

  const handleLoginSubmit = async (values) => {
    setLoadingBtn(true);

    if (values?.password?.length < 5) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Password must not be less than 5 characters",
        },
      });
      setLoadingBtn(false);
      return;
    }

    try {
      const res = await loginUser(values);

      // store tokens
      storeDataInCookie("access_token", res?.body?.accessToken);
      storeDataInCookie("refresh_token", res?.body?.refreshToken);

      // perform actions from url
      if (query?.action) {
        const action = loginActions[query?.action];
        await action(res?.body?.accessToken);
      }

      // Fix: restore scroll before navigating away
      document.body.style.overflow = "unset";

      // route to 'from' path if exists, otherwise go back to previous page
      if (query?.action && query?.from) {
        window.open(`${query?.from}`, "_self");
      } else if (query?.from) {
        window.open(`${query?.from}`, "_self");
      } else {
        window.open(`/`, "_self");
      }
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occured",
        },
      });

      if (
        err?.response?.data?.message ===
        "Please verify your email before logging in"
      ) {
        setTimeout(() => {
          push(`/otp?email=${values?.email}`);
        }, 3000);
        return;
      }

      setLoadingBtn(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await userInfoRes.json();

        toast.success(`Welcome back, ${userInfo.name}!`, {
          duration: 2000,
          position: "bottom-center",
        });

        // Fix: restore scroll before navigating away
        document.body.style.overflow = "unset";

        // Redirect to previous page or homepage
        setTimeout(() => {
          if (query?.from) {
            window.open(`${query?.from}`, "_self");
          } else {
            window.open("/", "_self");
          }
        }, 1500);

      } catch (err) {
        toast.error("Google login failed. Please try again.", {
          duration: 500,
          position: "bottom-center",
        });
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login was cancelled or failed.", {
        duration: 500,
        position: "bottom-center",
      });
      setGoogleLoading(false);
    },
  });

  return (
    <LoginWrapper>
      <Toaster containerClassName="toaster__style" />
      <FlexibleDiv maxWidth="350px" gap="40px" flexDir="column">

        {/* Branding — visible on mobile only */}
        <FlexibleDiv
          flexDir="column"
          alignItems="center"
          gap="8px"
          className="mobile__branding"
        >
          <Image
            src={Logo}
            alt="Oosri logo"
            width={100}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <p className="mobile__tagline">
            Africa&apos;s marketplace for the world
          </p>
        </FlexibleDiv>

        <h2>Login</h2>
        <Button
          border="1.5px solid rgba(224, 224, 224, 0.60)"
          radius="10px"
          width="100%"
          className="google__auth__btn"
          icon={<GoogleIcon size={25} />}
          onClick={() => handleGoogleLogin()}
          loading={googleLoading}
          type="button"
        >
          Login with google
        </Button>
        <Form form={form} onFinish={handleLoginSubmit}>
          <FlexibleDiv justifyContent="flex-start">
            <label className="input__label">Phone/Email Address</label>
            <Form.Item name="email">
              <TextField
                type="email"
                className="move__down"
                borderRadius="10px"
              />
            </Form.Item>

            {/* Password field */}
            <label className="input__label">Password</label>
            <Form.Item name="password">
              <TextField.Password
                type="password"
                className="password__style"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <p className="forgot__pass__text">
              Forgot Password?{" "}
              <Link href={"/forgot-password"}>
                <span>Click here</span>
              </Link>
            </p>
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
              Login
            </Button>
            <p className="no__account__yet">
              No account yet?{" "}
              <Link href={"/register"}>
                <span>Register here</span>
              </Link>{" "}
            </p>
          </FlexibleDiv>
        </Form>
      </FlexibleDiv>
    </LoginWrapper>
  );
}

export default function Login() {
  return (
    <AuthWrapper>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <LoginForm />
      </GoogleOAuthProvider>
    </AuthWrapper>
  );
}