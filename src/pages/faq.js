import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import FAQPage from "@/screens/Faq/faq";
import Head from "next/head";

const Faq = () => {
  return (
    <>
      <Head>
        <title>FAQs | Oosri</title>
      </Head>
      <FAQPage />
    </>
  );
};

Faq.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default Faq;
