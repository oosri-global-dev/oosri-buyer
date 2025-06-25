import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import ProductPage from "@/screens/ProductPage/productPage";
import Head from "next/head";
import { useProductQuery, handleGetSingleProduct } from "@/network/product";

export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;
  try {
    const data = await handleGetSingleProduct(id);
    product = data?.body?.product || null;
    if (!product) {
      // Trigger Next.js 404 page
      return { notFound: true };
    }
  } catch (e) {
    return { notFound: true };
  }
  return {
    props: {
      product,
      id,
    },
  };
}

const Product = ({ product, id }) => {
  // Use useProductQuery for hydration and revalidation
  const { data, isError, isLoading } = useProductQuery(id, {
    initialData: product ? { body: { product } } : undefined,
  });
  const productData = data?.body?.product;
  const showError = isError || !productData;

  return (
    <>
      <Head>
        <title>
          {isLoading
            ? "Loading product... | Oosri"
            : showError
            ? "No product found | Oosri"
            : `${productData?.productName || "Product"} | Oosri`}
        </title>
      </Head>
      <ProductPage
        product={productData}
        error={showError}
        loading={isLoading}
        relatedProducts={data?.body?.relatedProducts || []}
      />
    </>
  );
};

Product.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default Product;
