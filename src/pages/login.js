import AuthWrapper from "@/components/layouts/AuthWrapper/auth-wrapper";
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

LoginPage.getLayout = (page) => <AuthWrapper>{page}</AuthWrapper>;

export default LoginPage;
