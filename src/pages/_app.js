import "@/styles/globals.css";
import "@/styles/vars.css";
import "@/styles/nprogress-custom.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider, useMainContext } from "@/context";
import CustomToastBox from "@/components/lib/ToastBox";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import CustomModal from "@/components/lib/Modal/modal";
import basketLottie from "@/assets/images/basket.json";
import PrivacyConsentModal from "@/components/lib/PrivacyConsentModal/PrivacyConsentModal";

const queryClient = new QueryClient();

/**
 * AppContent Component
 * Consumes context and renders global overlays (modals, toasts).
 */
function AppContent({ Component, pageProps, getLayout }) {
  const [mounted, setMounted] = useState(false);
  const { loadingModal } = useMainContext();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* 
        1. Render page content first.
        2. Render global overlays LAST to ensure they are on top in the DOM.
      */}
      {getLayout(<Component {...pageProps} />)}

      <CustomToastBox />

      {mounted && (
        <>
          <CustomModal
            isOpen={loadingModal}
            content="Hang on a sec, we are setting up your basket for you."
            icon={basketLottie}
            isLottieIcon={true}
            canClose={false}
          />
          <PrivacyConsentModal />
        </>
      )}
    </>
  );
}

/**
 * Main App Entry Point
 */
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>
          Oosri - Authentic African marketplace
        </title>
        <meta
          name="description"
          content="Oosri is an African marketplace serving international buyers with authentic African made products."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent
            Component={Component}
            pageProps={pageProps}
            getLayout={getLayout}
          />
        </QueryClientProvider>
      </MainProvider>
    </>
  );
}