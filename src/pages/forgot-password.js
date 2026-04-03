import AuthLayoutWrapper from "@/components/layouts/GeneralLayout/AuthLayoutWrapper";
import ForgotPasswordSection from "@/screens/AuthScreens/ForgotPassword";

import Head from "next/head";

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Forgot Password | Oosri</title>
      </Head>
      <ForgotPasswordSection />
    </>
  );
};

ForgotPasswordPage.getLayout = (page) => (
  <AuthLayoutWrapper>{page}</AuthLayoutWrapper>
);

export default ForgotPasswordPage;
