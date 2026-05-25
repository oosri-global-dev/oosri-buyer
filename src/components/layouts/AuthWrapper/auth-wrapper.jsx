import { FlexibleDiv } from "@/components/lib/Box/styles";
import { AuthWrapperBox } from "./auth-wrapper.styles";
import { MdOutlineArrowBack as ArrowBack } from "react-icons/md";
import { useWindowSize } from "@/data-helpers/hooks";
import { useState, useEffect } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";

// Auth pages (other than /login) where a logged-in user should be sent home.
// /login is excluded because the login screen owns its post-auth redirect.
const AUTH_ONLY_PATHS = ["/register", "/forgot-password", "/otp", "/reset-password"];

export default function AuthWrapper({ children }) {
  const [width, height] = useWindowSize();
  const [removeHeader, setRemoveHeader] = useState(false);
  const { user } = useMainContext();
  const { push, replace, pathname } = useRouter();

  useEffect(() => {
    if (width <= 550) {
      setRemoveHeader(true);
    } else {
      setRemoveHeader(false);
    }
  }, [width]);

  useEffect(() => {
    // Redirect already-authenticated users away from auth-only pages.
    // Using an explicit path list prevents this from firing during the brief
    // navigation transition on /login when pathname momentarily becomes "/"
    // (which previously caused a competing push("/") on mobile, racing against
    // the login screen's own replace("/") and snapping the user back to login).
    if (user?.id && AUTH_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
      replace("/");
    }
  }, [user?.id, replace, pathname]);

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      // Since router.replace() removes the protected page from history,
      // history.back() will naturally go to the page before the protected route
      if (window.history.length > 1) {
        history.back();
      } else {
        // If no history, go to home
        push("/");
      }
    }
  };

  return (
    <AuthWrapperBox>
      <FlexibleDiv
        flexWrap="nowrap"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDir="row"
        className="top__navigation"
        onClick={handleGoBack}
      >
        <ArrowBack size={15} /> <p>Go Back</p>
      </FlexibleDiv>
      <FlexibleDiv className="auth__content__wrapper">{children}</FlexibleDiv>
    </AuthWrapperBox>
  );
}
