import { LoginWrapper } from "./register.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Form, Radio } from "antd";
import Button from "@/components/lib/Button";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import TextField from "@/components/lib/TextField";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";

export default function Register() {
  const [form] = Form.useForm();

  const handleRegisterSubmit = async (values) => {
    console.log("values", values);
  };

  return (
    <AuthWrapper>
      <LoginWrapper>
        <FlexibleDiv maxWidth="350px" gap="40px" flexDir="column">
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
                />
              </Form.Item>

              <FlexibleDiv className="move__down" flexWrap="nowrap" gap="15px">
                <Form.Item name="gender">
                  <Radio.Group className="radio__group__support">
                    <Radio value={"male"} className="radio__box">
                      Male
                    </Radio>
                    <Radio value={"female"} className="radio__box">
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
                />
              </Form.Item>

              <label className="input__label">Phone Number</label>
              <Form.Item name="phoneNumber">
                <TextField
                  type="text"
                  className="move__down"
                  borderRadius="10px"
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
