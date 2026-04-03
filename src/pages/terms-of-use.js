import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import { TermsOfUsePage } from "@/screens/TermsOfUse/TermOfUse";
import Head from "next/head";

const TermsOfUse = () => {
  return (
    <>
      <Head>
        <title>Terms of Use | Oosri</title>
      </Head>
      <TermsOfUsePage />
    </>
  );
};

TermsOfUse.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default TermsOfUse;
