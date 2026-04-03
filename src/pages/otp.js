import AuthLayoutWrapper from "@/components/layouts/GeneralLayout/AuthLayoutWrapper";
import OTP from "@/screens/AuthScreens/OTPScreen/otp";
import Head from "next/head";

const OTPScreen = () => {
  return (
    <>
      <Head>
        <title>Enter your OTP | Oosri</title>
      </Head>
      <OTP />
    </>
  );
};

OTPScreen.getLayout = (page) => <AuthLayoutWrapper>{page}</AuthLayoutWrapper>;

export default OTPScreen;
