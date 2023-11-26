import Footer from "./Footer/footer";
import { GeneralLayoutWrapper } from "./generalLayout.styles";
import Header from "./Header/header";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
}) {
  return (
    <>
      <GeneralLayoutWrapper>
        {!noHeader && <Header />}
        {children}
      </GeneralLayoutWrapper>
      {!noFooter && <Footer />}
    </>
  );
}
