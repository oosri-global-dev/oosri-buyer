import "@/styles/globals.css";
import "@/styles/vars.css";
import Head from "next/head";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context";
import CustomToastBox from "@/components/lib/ToastBox";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const unauthorizedLinks = [
    "/login",
    "/reset-password",
    "/forgot-password",
    "/register",
    "/otp",
  ];
  const router = useRouter();

  // Extract the pathname from asPath
  const pathname = router.asPath.split("?")[0];

  const pages = [
    { name: "Search", path: "/search", useContextTitle: false },
    { name: "Cart", path: "/cart", useContextTitle: true },
  ];

  const fetchPageTitle = (path) => {
    const item = pages.find((page) => page.path === path);
    return item ? item.name : "";
  };

  const fetchContextTitle = (path) => {
    const item = pages.find((page) => page.path === path);
    return item ? item.useContextTitle : false;
  };

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
          {unauthorizedLinks.includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <GeneralLayout
              title={fetchPageTitle(pathname)}
              contextTitle={fetchContextTitle(pathname)}
              isAuth={true}
            >
              <Component {...pageProps} />
            </GeneralLayout>
          )}
        </QueryClientProvider>
      </MainProvider>
    </>
  );
}
