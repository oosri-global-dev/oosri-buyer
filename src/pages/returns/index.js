import Head from "next/head";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import MyReturns from "@/screens/Returns/my-returns";

const ReturnsPage = () => (
  <>
    <Head><title>My Returns | Oosri</title></Head>
    <MyReturns />
  </>
);

ReturnsPage.getLayout = (page) => <GeneralLayout isAuth={true}>{page}</GeneralLayout>;

export default ReturnsPage;
