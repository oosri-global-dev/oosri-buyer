import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Homepage from "@/screens/HomeScreens/Homepage/homepage";
import Head from "next/head";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>
          Oosri is an African marketplace serving international buyers in the
          USA, UK, Canada, EU, Australia, UAE, and more with authentic African
          made products
        </title>
      </Head>
      <Homepage />
    </>
  );
};

LandingPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default LandingPage;
