import Head from "next/head";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import MyReviews from "@/screens/Reviews/my-reviews";

const ReviewsPage = () => (
  <>
    <Head><title>My Reviews | Oosri</title></Head>
    <MyReviews />
  </>
);

ReviewsPage.getLayout = (page) => <GeneralLayout isAuth={true}>{page}</GeneralLayout>;

export default ReviewsPage;
