import { LoginWrapper } from "./login.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Form } from "antd";
import Button from "@/components/lib/Button";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import TextField from "@/components/lib/TextField";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { useState, useCallback } from "react";
import { loginUser, googleLogin as googleLoginUser } from "@/network/auth";
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

/**
 * LoginForm Component
 * Handles both regular and Google authentication for buyers.
 */
function LoginForm() {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { dispatch } = useMainContext();
  const { push, query } = useRouter();

  /**
   * Universal redirect handler
   */
  const handleRedirect = useCallback((targetPath) => {
    // Restore scroll before navigating away
    document.body.style.overflow = "unset";
    
    // Use window.open for a clean state reload, or router.push for SPA feel
    // Given the project's current pattern, window.open is used for state reset
    window.open(targetPath || "/", "_self");
  }, []);

  /**
   * Regular Login Submission
   */
  const handleLoginSubmit = async (values) => {
    setLoadingBtn(true);

    if (!values?.password || values.password.length < 5) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Password must be at least 5 characters long",
        },
      });
      setLoadingBtn(false);
      return;
    }

    try {
      const res = await loginUser(values);

      // Securely store tokens
      storeDataInCookie("access_token", res?.body?.accessToken);
      storeDataInCookie("refresh_token", res?.body?.refreshToken);

      // Execute any pending actions (e.g., merging carts)
      if (query?.action && loginActions[query?.action]) {
        await loginActions[query?.action](res?.body?.accessToken);
      }

      toast.success("Login successful! Redirecting...");

      // Redirect logic: 'from' parameter takes precedence
      const redirectPath = query?.from || "/";
      setTimeout(() => handleRedirect(redirectPath), 1000);

    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Authentication failed. Please check your credentials.";
      
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: errorMessage,
        },
      });

      // Handle unverified email case
      if (errorMessage.toLowerCase().includes("verify your email")) {
        setTimeout(() => {
          push(`/otp?email=${encodeURIComponent(values?.email)}`);
        }, 2000);
      }

      setLoadingBtn(false);
    }
  };

  /**
   * Google Login Handler
   */
  const handleGoogleLoginSuccess = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        const res = await googleLoginUser({
          accessToken: tokenResponse.access_token,
        });

        storeDataInCookie("access_token", res?.body?.accessToken);
        storeDataInCookie("refresh_token", res?.body?.refreshToken);

        if (query?.action && loginActions[query?.action]) {
          await loginActions[query?.action](res?.body?.accessToken);
        }

        toast.success(`Welcome back, ${res?.body?.user?.fullName || "Buyer"}!`, {
          duration: 2000,
          position: "bottom-center",
        });

        const redirectPath = query?.from || "/";
        setTimeout(() => handleRedirect(redirectPath), 1500);

      } catch (err) {
        toast.error("Google authentication failed. Please try again.", {
          duration: 3000,
          position: "bottom-center",
        });
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login was cancelled.", {
        duration: 2000,
        position: "bottom-center",
      });
      setGoogleLoading(false);
    },
  });

  return (
    <LoginWrapper>
      <Toaster containerClassName="toaster__style" />
      <FlexibleDiv maxWidth="350px" gap="40px" flexDir="column">

        {/* Branding — mobile optimized */}
        <FlexibleDiv
          flexDir="column"
          alignItems="center"
          gap="8px"
          className="mobile__branding"
        >
          <Image
            src={Logo}
            alt="Oosri logo"
            width={120}
            height={48}
            style={{ objectFit: "contain" }}
          />
          <p className="mobile__tagline">
            Africa's marketplace for the world
          </p>
        </FlexibleDiv>

        <h2>Login</h2>

        {/* Google Authentication Utility */}
        <Button
          border="1.5px solid rgba(224, 224, 224, 0.60)"
          radius="10px"
          width="100%"
          className="google__auth__btn"
          icon={<GoogleIcon size={25} />}
          onClick={() => handleGoogleLoginSuccess()}
          loading={googleLoading}
          type="button"
        >
          Login with Google
        </Button>

        <Form form={form} onFinish={handleLoginSubmit} layout="vertical">
          <FlexibleDiv justifyContent="flex-start">
            
            <label className="input__label">Phone/Email Address</label>
            <Form.Item 
              name="email" 
              rules={[{ required: true, message: "Please enter your email or phone number" }]}
            >
              <TextField
                type="text" // Changed to text to support both phone and email
                className="move__down"
                borderRadius="10px"
                placeholder="Enter email or phone"
              />
            </Form.Item>

            <label className="input__label">Password</label>
            <Form.Item 
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <TextField.Password
                className="password__style"
                placeholder="••••••••"
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

/**
 * Main Login Page Export
 * Wrapped with essential providers for Authentication and Google OAuth.
 */
export default function Login() {
  return (
    <AuthWrapper>
      <GoogleOAuthProvider clientId="519641043381-8fni1j8vbmoakegvomk1lsfrgrnd0q4d.apps.googleusercontent.com">
        <LoginForm />
      </GoogleOAuthProvider>
    </AuthWrapper>
  );
}
