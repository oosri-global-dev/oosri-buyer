import AuthLayoutWrapper from "@/components/layouts/GeneralLayout/AuthLayoutWrapper";
import ResetPasswordSection from "@/screens/AuthScreens/ResetScreen";
import Head from "next/head";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Reset Password | Oosri</title>
      </Head>
      <ResetPasswordSection />
    </>
  );
};

ResetPasswordPage.getLayout = (page) => (
  <AuthLayoutWrapper>{page}</AuthLayoutWrapper>
);

export default ResetPasswordPage;
