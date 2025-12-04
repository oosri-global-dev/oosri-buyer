import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
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

ForgotPasswordPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default ForgotPasswordPage;
