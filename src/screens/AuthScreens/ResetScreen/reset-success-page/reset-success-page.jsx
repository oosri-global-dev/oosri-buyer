import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ResetSuccessPageWrapper } from "./reset-success-page.styles";
import { FiCheck as CheckIcon } from "react-icons/fi";
import Button from "@/components/lib/Button";

export default function ResetSuccessPage({ setStep }) {
  return (
    <AuthWrapper>
      <ResetSuccessPageWrapper>
        <FlexibleDiv className="check__icon__wrapper">
          <CheckIcon size={45} color="var(--orrsiWhite)" />
        </FlexibleDiv>
        <FlexibleDiv>
          <h2>Password Reset Successful</h2>
          <p className="header__sub__text">
            Your password has been reset successfully. You can now log in with
            your new password and continue to access your account.
          </p>
        </FlexibleDiv>
        <Button
          width="90%"
          backgroundColor="var(--orrsiPrimary)"
          type="submit"
          htmlType="submit"
          color="var(--orrsiWhite)"
          radius="10px"
          margin="10px 0 0 0"
        >
          Login
        </Button>
      </ResetSuccessPageWrapper>
    </AuthWrapper>
  );
}
