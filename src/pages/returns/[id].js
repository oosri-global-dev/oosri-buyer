import Head from "next/head";
import { useRouter } from "next/router";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import ReturnDetail from "@/screens/Returns/return-detail";

const ReturnDetailPage = () => {
  const { query } = useRouter();
  return (
    <>
      <Head><title>Return Request | Oosri</title></Head>
      {query.id && <ReturnDetail id={query.id} />}
    </>
  );
};

ReturnDetailPage.getLayout = (page) => <GeneralLayout isAuth={true}>{page}</GeneralLayout>;

export default ReturnDetailPage;
