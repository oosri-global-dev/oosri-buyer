import AuthLayoutWrapper from "@/components/layouts/GeneralLayout/AuthLayoutWrapper";
import Login from "@/screens/AuthScreens/LoginScreen/login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login to your Oosri account</title>
      </Head>
      <Login />
    </>
  );
};

LoginPage.getLayout = (page) => <AuthLayoutWrapper>{page}</AuthLayoutWrapper>;

export default LoginPage;
