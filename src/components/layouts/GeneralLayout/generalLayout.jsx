import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "./Footer/footer";
import { GeneralLayoutWrapper, AuthOverlay } from "./generalLayout.styles";
import Header from "./Header/header";
import { useMainContext } from "@/context";
import { getDataInCookie } from "@/data-helpers/auth-session";
import OorsiLoader from "@/components/lib/Loader/loader";
import _ from "lodash";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
  title = false,
  contextTitle = false,
  isAuth = false,
}) {
  const { dispatch, pageTitle, user, isLoadingUser } = useMainContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      const userToken = getDataInCookie("access_token");

      // If no token exists, redirect immediately
      if (!userToken) {
        router.push("/login");
      }
    }
  }, [isAuth, router]);

  // Show overlay while checking authentication
  // Hide overlay when:
  // 1. Not an auth page (isAuth is false)
  // 2. User is loaded and exists
  // 3. User loading is complete and user doesn't exist (will redirect)
  const showOverlay =
    isAuth &&
    (isLoadingUser || (_.isEmpty(user) && getDataInCookie("access_token")));

  return (
    <>
      <GeneralLayoutWrapper>
        {!noHeader && <Header />}
        {contextTitle && <h1 className="page__title">{pageTitle}</h1>}
        <> {title && <h1 className="page__title">{title}</h1>}</>

        {showOverlay ? (
          <AuthOverlay>
            <OorsiLoader />
          </AuthOverlay>
        ) : (
          children
        )}
      </GeneralLayoutWrapper>
      {!noFooter && <Footer />}
    </>
  );
}
