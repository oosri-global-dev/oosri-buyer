import { LoginWrapper } from "./login.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Form } from "antd";
import Button from "@/components/lib/Button";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import TextField from "@/components/lib/TextField";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";

export default function Login() {
  const [form] = Form.useForm();

  const handleLoginSubmit = async (values) => {
    console.log("values", values);
  };

  return (
    <AuthWrapper>
      <LoginWrapper>
        <FlexibleDiv maxWidth="350px" gap="40px" flexDir="column">
          <h2>Login</h2>
          <Button
            border="1.5px solid rgba(224, 224, 224, 0.60)"
            radius="10px"
            width="100%"
            className="google__auth__btn"
            icon={<GoogleIcon size={25} />}
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
    </AuthWrapper>
  );
}
