import "@/styles/globals.css";
import "@/styles/vars.css";
import Head from "next/head";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const unauthorizedLinks = [
    "/login",
    "/reset-password",
    "/forgot-password",
    "/register",
  ];
  const { asPath } = useRouter();

  const pages = [
    { name: "Search", path: "/search", useContextTitle: false },
    { name: "Cart", path: "/cart", useContextTitle: true },
  ];

  const fetchPageTitle = (path) => {
    const item = pages.filter((page) => page.path === path);

    if (item.length > 0) {
      return item[0].name || "";
    } else {
      return "";
    }
  };

  const fetchContextTitle = (path) => {
    const item = pages.filter((page) => page.path === path);

    if (item.length > 0) {
      return item[0].useContextTitle;
    } else {
      return false;
    }
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
      <QueryClientProvider client={queryClient}>
        <MainProvider>
          {unauthorizedLinks.includes(asPath) ? (
            <Component {...pageProps} />
          ) : (
            <GeneralLayout
              title={fetchPageTitle(asPath)}
              contextTitle={fetchContextTitle(asPath)}
            >
              <Component {...pageProps} />
            </GeneralLayout>
          )}
        </MainProvider>
      </QueryClientProvider>
    </>
  );
}
