import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Homepage from "@/screens/HomeScreens/Homepage/homepage";
import Head from "next/head";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>
          Oosri | Direct UK, US and Canadian used and new Phones, Gadgets & More
        </title>
      </Head>
      <Homepage />
    </>
  );
};

LandingPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default LandingPage;
