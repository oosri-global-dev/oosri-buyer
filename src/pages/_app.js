import "@/styles/globals.css";
import "@/styles/vars.css";
import "@/styles/nprogress-custom.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context";
import CustomToastBox from "@/components/lib/ToastBox";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import CustomModal from "@/components/lib/Modal/modal";
import basketLottie from "@/assets/images/basket.json";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsModalOpen(true); 
    }
  }, [mounted]); 

  // Extract the pathname from asPath
  const pathname = router.asPath.split("?")[0];

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

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
          {mounted && ( // Conditionally render modal only after client-side mount
            <CustomModal
              isOpen={isModalOpen}
              content="We are setting up your basket for you."
              icon={basketLottie}
              isLottieIcon={true}
              canClose={false}
            />
          )}
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </MainProvider>
    </>
  );
}
