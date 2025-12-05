import { FlexibleDiv } from "@/components/lib/Box/styles";
import { AuthWrapperBox } from "./auth-wrapper.styles";
import { MdOutlineArrowBack as ArrowBack } from "react-icons/md";
import { useWindowSize } from "@/data-helpers/hooks";
import { useState, useEffect } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";

export default function AuthWrapper({ children }) {
  const [width, height] = useWindowSize();
  const [removeHeader, setRemoveHeader] = useState(false);
  const { user } = useMainContext();
  const { push } = useRouter();

  useEffect(() => {
    if (width <= 550) {
      setRemoveHeader(true);
    } else {
      setRemoveHeader(false);
    }
  }, [width]);

  useEffect(() => {
    if (user?.id) {
      push("/");
    }
  }, [user]);

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
