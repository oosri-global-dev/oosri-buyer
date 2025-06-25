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
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content={
            isLoading
              ? "Loading product... | Oosri"
              : showError
              ? "No product found | Oosri"
              : `${productData?.productName || "Product"} | Oosri`
          }
        />
        <meta
          property="og:description"
          content={
            isLoading
              ? "Loading product details..."
              : showError
              ? "No product found."
              : productData?.description || "Product details on Oosri."
          }
        />
        <meta
          property="og:image"
          content={productData?.images?.[0] || "/images/product/loader.gif"}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/product/${id}`}
        />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            isLoading
              ? "Loading product... | Oosri"
              : showError
              ? "No product found | Oosri"
              : `${productData?.productName || "Product"} | Oosri`
          }
        />
        <meta
          name="twitter:description"
          content={
            isLoading
              ? "Loading product details..."
              : showError
              ? "No product found."
              : productData?.description || "Product details on Oosri."
          }
        />
        <meta
          name="twitter:image"
          content={productData?.images?.[0] || "/images/product/loader.gif"}
        />
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
