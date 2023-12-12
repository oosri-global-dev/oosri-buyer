import Footer from "./Footer/footer";
import { GeneralLayoutWrapper } from "./generalLayout.styles";
import Header from "./Header/header";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
  title = false,
}) {
  return (
    <>
      <GeneralLayoutWrapper>
        {!noHeader && <Header />}
        {title && <h1 className="page__title">{title}</h1>}
        {children}
      </GeneralLayoutWrapper>
      {!noFooter && <Footer />}
    </>
  );
}
