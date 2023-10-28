import Footer from "./Footer/footer";
import { GeneralLayoutWrapper } from "./generalLayout.styles";
import Header from "./Header/header";

export default function GeneralLayout({ children }) {
  return (
    <>
      <GeneralLayoutWrapper>
        <Header />
        {children}
      </GeneralLayoutWrapper>
      <Footer />
    </>
  );
}
