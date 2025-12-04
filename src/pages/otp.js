import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
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

OTPScreen.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default OTPScreen;
