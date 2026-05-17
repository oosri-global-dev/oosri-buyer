import { LoginWrapper } from "./register.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Form, Radio } from "antd";
import Button from "@/components/lib/Button";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import TextField from "@/components/lib/TextField";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { signUpUser } from "@/network/auth";
import { useRouter } from "next/router";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Logo from "@/assets/images/homepage/logo.png";

/**
 * RegisterForm Component
 * Handles buyer registration and Google account linking.
 */
function GoogleRegisterButton({ form, setGoogleLoading }) {
  const handleGoogleAuth = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setGoogleLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/google-userinfo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        const data = await res.json();
        const userInfo = data?.body;

        form.setFieldsValue({
          fullName: userInfo.name,
          email: userInfo.email,
        });

        toast.success(`Welcome ${userInfo.name}! Please set a password and gender to complete registration.`, {
          duration: 4000,
          position: "bottom-center",
        });
      } catch (err) {
        toast.error("Google sync failed. Please fill the form manually.", { position: "bottom-center" });
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google authentication was cancelled.", { position: "bottom-center" });
    },
  });

  return (
    <Button
      border="1.5px solid rgba(224, 224, 224, 0.60)"
      radius="10px"
      width="100%"
      className="google__auth__btn"
      icon={<GoogleIcon size={25} />}
      onClick={() => handleGoogleAuth()}
      type="button"
    >
      Register with Google
    </Button>
  );
}

function DisabledGoogleRegisterButton() {
  return (
    <Button
      border="1.5px solid rgba(224, 224, 224, 0.60)"
      radius="10px"
      width="100%"
      className="google__auth__btn"
      icon={<GoogleIcon size={25} />}
      onClick={() =>
        toast.error("Google registration is not configured for this environment.", {
          duration: 3000,
          position: "bottom-center",
        })
      }
      type="button"
      disabled
    >
      Register with Google
    </Button>
  );
}

function RegisterForm({ form, googleButton = null, googleLoading = false }) {
  const [loading, setIsLoading] = useState(false);
  const { push } = useRouter();

  /**
   * Submission handler for manual registration
   */
  const handleRegisterSubmit = async (values) => {
    setIsLoading(true);
    
    // Basic validation
    if (!values?.gender) {
      toast.error("Please select your gender", { position: "bottom-center" });
      window.scroll(0, 0);
      setIsLoading(false);
      return;
    }

    if (!values?.password || values.password.length < 5) {
      toast.error("Password must be at least 5 characters long", { position: "bottom-center" });
      window.scroll(0, 0);
      setIsLoading(false);
      return;
    }

    try {
      const res = await signUpUser(values);
      window.scroll(0, 0);
      toast.success("Signup successful! Verifying your email...");
      
      setTimeout(() => {
        push(`/otp?email=${encodeURIComponent(res?.body?.email)}`);
      }, 1500);
    } catch (err) {
      window.scroll(0, 0);
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again later.",
        { position: "bottom-center" }
      );
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <Toaster containerClassName="toaster__style" />
      <FlexibleDiv maxWidth="420px" width="100%" gap="32px" flexDir="column">

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
            Africa&apos;s marketplace for the world
          </p>
        </FlexibleDiv>

        <h2>Register</h2>

        <div aria-busy={googleLoading}>{googleButton || <DisabledGoogleRegisterButton />}</div>

        <Form form={form} onFinish={handleRegisterSubmit} layout="vertical">
          <FlexibleDiv justifyContent="flex-start">
            
            <label className="input__label">Full Name</label>
            <Form.Item 
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <TextField
                className="move__down"
                borderRadius="10px"
                placeholder="John Doe"
              />
            </Form.Item>

            <Form.Item name="gender" rules={[{ required: true }]}>
              <Radio.Group className="radio__group__support">
                <Radio value="Male" className="radio__box">Male</Radio>
                <Radio value="Female" className="radio__box">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <label className="input__label">Email Address</label>
            <Form.Item 
              name="email"
              rules={[{ required: true, type: "email", message: "Please enter a valid email address" }]}
            >
              <TextField
                className="move__down"
                borderRadius="10px"
                placeholder="example@mail.com"
              />
            </Form.Item>

            <label className="input__label">Phone Number</label>
            <Form.Item 
              name="phoneNumber"
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <TextField
                className="move__down"
                borderRadius="10px"
                placeholder="e.g. 08012345678"
              />
            </Form.Item>

            <label className="input__label">Create Password</label>
            <Form.Item 
              name="password"
              rules={[{ required: true, message: "Please create a password" }]}
            >
              <TextField.Password
                className="password__style"
                placeholder="••••••••"
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
              margin="25px 0 0 0"
              loading={loading}
            >
              Register
            </Button>

            <p className="no__account__yet">
              I have an account already{" "}
              <Link href={"/login"}>
                <span>Login here</span>
              </Link>{" "}
            </p>
          </FlexibleDiv>
        </Form>
      </FlexibleDiv>
    </LoginWrapper>
  );
}

/**
 * Main Register Page Export
 */
export default function Register() {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const isGoogleAuthEnabled = Boolean(googleClientId);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <AuthWrapper>
      {isGoogleAuthEnabled ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <RegisterForm
            form={form}
            googleLoading={googleLoading}
            googleButton={<GoogleRegisterButton form={form} setGoogleLoading={setGoogleLoading} />}
          />
        </GoogleOAuthProvider>
      ) : (
        <RegisterForm
          form={form}
          googleLoading={googleLoading}
          googleButton={<DisabledGoogleRegisterButton />}
        />
      )}
    </AuthWrapper>
  );
}
