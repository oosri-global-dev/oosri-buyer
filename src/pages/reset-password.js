import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
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

ResetPasswordPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default ResetPasswordPage;
