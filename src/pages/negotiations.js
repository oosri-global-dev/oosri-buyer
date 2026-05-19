import Head from "next/head";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import NegotiationsScreen from "@/screens/NegotiationsScreen/negotiationsScreen";

const NegotiationsPage = () => {
  return (
    <>
      <Head>
        <title>My Negotiations | Oosri</title>
      </Head>
      <NegotiationsScreen />
    </>
  );
};

NegotiationsPage.getLayout = (page) => <GeneralLayout isAuth={true}>{page}</GeneralLayout>;

export default NegotiationsPage;
