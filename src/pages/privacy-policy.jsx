import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import PrivacyPolicyPage from "@/screens/PrivacyPolicy/PrivacyPolicy";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Oosri</title>
        <meta
          name="description"
          content="Oosri's Privacy Policy. Learn how we collect, use, and protect your personal information."
        />
      </Head>
      <PrivacyPolicyPage />
    </>
  );
};

PrivacyPolicy.getLayout = (page) => <GeneralLayout fullBleed>{page}</GeneralLayout>;

export default PrivacyPolicy;
