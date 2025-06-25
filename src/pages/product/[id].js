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

  // Use server-side product for meta tags to ensure correct SSR for social sharing
  const metaProduct = product || {};
  const metaTitle = metaProduct.productName
    ? `${metaProduct.productName} | Oosri`
    : showError
    ? "No product found | Oosri"
    : "Loading product... | Oosri";
  const metaDescription = metaProduct.description
    ? metaProduct.description
    : showError
    ? "No product found."
    : "Loading product details...";
  const metaImage = metaProduct.images?.[0] || "/favicon.ico";
  const metaUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/product/${id}`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
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
