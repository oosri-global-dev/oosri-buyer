import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import ContactPage from '@/screens/Contact-us/contact'
import Head from "next/head";

const ContactUs = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Oosri</title>
      </Head>
      <ContactPage />
    </>
  );
};

ContactUs.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default ContactUs;
