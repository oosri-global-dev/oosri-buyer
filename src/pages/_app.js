import "@/styles/globals.css";
import "@/styles/vars.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context";
import CustomToastBox from "@/components/lib/ToastBox";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  // Extract the pathname from asPath
  const pathname = router.asPath.split("?")[0];

  return (
    <>
      <Head>
        <title>
          Oosri Global | Direct UK, US and Canadian used and new Phones, Gadgets
          & More
        </title>
        <meta
          name="description"
          content="Direct UK, US and Canadian used and new Phones, Gadgets
          & More"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainProvider>
        <QueryClientProvider client={queryClient}>
          <CustomToastBox />
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </MainProvider>
    </>
  );
}
