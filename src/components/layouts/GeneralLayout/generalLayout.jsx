import { useEffect, useContext } from "react";
import Footer from "./Footer/footer";
import { GeneralLayoutWrapper } from "./generalLayout.styles";
import Header from "./Header/header";
import { MainContext } from "@/context";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
  title = false,
  contextTitle = false,
}) {
  const {
    state: { pageTitle },
  } = useContext(MainContext);

  return (
    <>
      <GeneralLayoutWrapper>
        {!noHeader && <Header />}
        {contextTitle && <h1 className="page__title">{pageTitle}</h1>}
        {!contextTitle && (
          <> {title && <h1 className="page__title">{title}</h1>}</>
        )}
        {children}
      </GeneralLayoutWrapper>
      {!noFooter && <Footer />}
    </>
  );
}
