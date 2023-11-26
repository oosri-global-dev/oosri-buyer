import ResetPassword from "./reset-page/reset-page";
import ResetSuccessPage from "./reset-success-page/reset-success-page";
import { useState } from "react";

export default function ResetPasswordSection() {
  const [step, setStep] = useState(1);

  return step === 1 ? (
    <ResetPassword setStep={setStep} />
  ) : (
    <ResetSuccessPage setStep={setStep} />
  );
}
