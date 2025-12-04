import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
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

RegisterPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default RegisterPage;
