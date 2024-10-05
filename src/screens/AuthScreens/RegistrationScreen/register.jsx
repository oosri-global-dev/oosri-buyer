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

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleRegisterSubmit = async (values) => {
    setIsLoading(true);
    if (typeof values?.gender === "undefined") {
      toast.error(`Please select a gender`, {
        duration: "400",
        position: "bottom-center",
      });
      window.scroll(0, 0);
      return;
    }

    if (values?.password?.length < 5) {
      toast.error(`Password must not be less than 5 characters`, {
        duration: "400",
        position: "bottom-center",
      });
      window.scroll(0, 0);
      return;
    }

    try {
      const res = await signUpUser(values);

      //scroll to the top
      window.scroll(0, 0);

      //toast message
      toast.success(`Signup was successful`, {
        duration: "500",
        position: "bottom-center",
      });

      setTimeout(() => {
        //redirect to the otp
        push(`/otp?email=${res?.body?.email}`);
      }, [1200]);
    } catch (err) {
      //scroll to the top
      window.scroll(0, 0);
      toast.error(
        err?.response?.data?.message || "Cannot sign user up at the moment",
        {
          duration: "500",
          position: "bottom-center",
        }
      );
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper isAuth={false}>
      <LoginWrapper>
        <FlexibleDiv maxWidth="350px" gap="40px" flexDir="column">
          <Toaster containerClassName="toaster__style" />
          <h2>Register</h2>
          <Button
            border="1.5px solid rgba(224, 224, 224, 0.60)"
            radius="10px"
            width="100%"
            className="google__auth__btn"
            icon={<GoogleIcon size={25} />}
          >
            Register with google
          </Button>
          <Form form={form} onFinish={handleRegisterSubmit}>
            <FlexibleDiv justifyContent="flex-start">
              <label className="input__label">Full Name</label>
              <Form.Item name="fullName">
                <TextField
                  type="text"
                  className="move__down"
                  borderRadius="10px"
                  autoComplete="new-password"
                  maxLength={50}
                  required
                />
              </Form.Item>

              <FlexibleDiv className="move__down" flexWrap="nowrap" gap="15px">
                <Form.Item name="gender" required>
                  <Radio.Group className="radio__group__support">
                    <Radio value={"Male"} className="radio__box">
                      Male
                    </Radio>
                    <Radio value={"Female"} className="radio__box">
                      Female
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </FlexibleDiv>

              <label className="input__label">Email</label>
              <Form.Item name="email">
                <TextField
                  type="email"
                  className="move__down"
                  borderRadius="10px"
                  required
                />
              </Form.Item>

              <label className="input__label">Phone Number</label>
              <Form.Item name="phoneNumber">
                <TextField
                  type="number"
                  className="move__down"
                  borderRadius="10px"
                  required
                />
              </Form.Item>

              {/* Password field */}
              <label className="input__label">Create Password</label>
              <Form.Item name="password">
                <TextField.Password
                  type="password"
                  className="password__style"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  autoComplete="new-password"
                  required
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
    </AuthWrapper>
  );
}
