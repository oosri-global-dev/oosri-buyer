import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import ShopPage from "@/screens/ShopScreen/ShopScreen";
import Head from "next/head";

const Shop = () => {
  return (
    <>
      <Head>
        <title>Shop | Oosri</title>
      </Head>
      <ShopPage />
    </>
  );
};

Shop.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default Shop;
