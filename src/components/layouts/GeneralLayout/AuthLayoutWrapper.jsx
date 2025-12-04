import { useState, useEffect } from "react";
import { useWindowSize } from "@/data-helpers/hooks";
import GeneralLayout from "./generalLayout";

export default function AuthLayoutWrapper({ children, ...props }) {
  const [width] = useWindowSize();
  const [noHeader, setNoHeader] = useState(false);

  useEffect(() => {
    setNoHeader(width <= 550);
  }, [width]);

  return (
    <GeneralLayout noHeader={noHeader} {...props}>
      {children}
    </GeneralLayout>
  );
}

