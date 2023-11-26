import { FlexibleDiv } from "@/components/lib/Box/styles";
import { AuthWrapperBox } from "./auth-wrapper.styles";
import { MdOutlineArrowBack as ArrowBack } from "react-icons/md";
import GeneralLayout from "../GeneralLayout/generalLayout";
import { useWindowSize } from "@/data-helpers/hooks";
import { useState, useEffect } from "react";

export default function AuthWrapper({ children }) {
  const [width, height] = useWindowSize();
  const [removeHeader, setRemoveHeader] = useState(false);

  useEffect(() => {
    if (width <= 550) {
      setRemoveHeader(true);
    } else {
      setRemoveHeader(false);
    }
  }, [width]);

  return (
    <GeneralLayout noFooter noHeader={removeHeader}>
      <AuthWrapperBox>
        <FlexibleDiv
          flexWrap="nowrap"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDir="row"
          className="top__navigation"
        >
          <ArrowBack size={15} /> <p>Go Back</p>
        </FlexibleDiv>
        <FlexibleDiv className="auth__content__wrapper">{children}</FlexibleDiv>
      </AuthWrapperBox>
    </GeneralLayout>
  );
}
