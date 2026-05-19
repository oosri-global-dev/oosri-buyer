import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import SellerStorePage from "@/screens/SellerStorePage/SellerStorePage";
import { fetchSellerStore } from "@/network/seller";

export async function getServerSideProps(context) {
  const { storeName } = context.params;
  try {
    const data = await fetchSellerStore(storeName);
    const seller = data?.body?.seller || null;
    if (!seller) {
      return { notFound: true };
    }
    return { props: { seller, identifier: storeName } };
  } catch (e) {
    return { props: { seller: null, identifier: storeName } };
  }
}

const SellerStoreRoute = ({ seller, identifier }) => (
  <SellerStorePage seller={seller} identifier={identifier} />
);

SellerStoreRoute.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default SellerStoreRoute;
