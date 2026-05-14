import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "./Footer/footer";
import { GeneralLayoutWrapper, AuthOverlay } from "./generalLayout.styles";
import Header from "./Header/header";
import { useMainContext } from "@/context";
import { hasBuyerSession } from "@/data-helpers/auth-session";
import OorsiLoader from "@/components/lib/Loader/loader";
import _ from "lodash";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
  title = false,
  contextTitle = false,
  isAuth = false,
  fullBleed = false,
}) {
  const { dispatch, pageTitle, user, isLoadingUser } = useMainContext();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isAuth) {
      const hasSession = hasBuyerSession();

      // If no token exists, redirect immediately
      // Use replace instead of push to remove protected page from history
      // This way, history.back() will go to the page before the protected route
      if (!hasSession) {
        setIsRedirecting(true);
        router.replace("/login");
      }
    }
  }, [isAuth, router]);

  // Show overlay while checking authentication
  // Hide overlay only when user exists (authentication confirmed)
  // The overlay will show:
  // - While loading user (isLoadingUser is true)
  // - When user is empty (either no token, or token exists but user fetch hasn't completed/failed)
  // - During redirect (isRedirecting is true)
  // The overlay will hide only when user exists (authentication confirmed)
  const showOverlay =
    isAuth && (isRedirecting || isLoadingUser || _.isEmpty(user));

  return (
    <>
      <GeneralLayoutWrapper style={fullBleed ? { minHeight: "auto" } : undefined}>
        {!noHeader && <Header />}
        {contextTitle && <h1 className="page__title">{pageTitle}</h1>}
        <> {title && <h1 className="page__title">{title}</h1>}</>

        {!fullBleed && (showOverlay ? (
          <AuthOverlay>
            <OorsiLoader />
          </AuthOverlay>
        ) : (
          children
        ))}
      </GeneralLayoutWrapper>
      {fullBleed && children}
      {!noFooter && <Footer />}
    </>
  );
}
