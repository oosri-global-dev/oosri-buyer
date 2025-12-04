import AuthLayoutWrapper from "@/components/layouts/GeneralLayout/AuthLayoutWrapper";
import Register from "@/screens/AuthScreens/RegistrationScreen/register";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Registration Page | Oosri</title>
      </Head>
      <Register />
    </>
  );
};

RegisterPage.getLayout = (page) => (
  <AuthLayoutWrapper>{page}</AuthLayoutWrapper>
);

export default RegisterPage;
