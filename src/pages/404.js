import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import NotFound from "@/screens/404/not-found";
import Head from "next/head";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404 | Oosri</title>
      </Head>
      <NotFound />
    </>
  );
};

NotFoundPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default NotFoundPage;
