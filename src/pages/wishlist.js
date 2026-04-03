import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import WishlistPage from '@/screens/Wishlist/WishlistScreen'
import Head from "next/head";

const Wishlist = () => {
  return (
    <>
      <Head>
        <title>Wishlist | Oosri</title>
      </Head>
      <WishlistPage />
    </>
  );
};

Wishlist.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default Wishlist;
