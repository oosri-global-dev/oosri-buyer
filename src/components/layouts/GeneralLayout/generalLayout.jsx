import { useEffect, useContext, useRef } from "react";
import Footer from "./Footer/footer";
import { GeneralLayoutWrapper } from "./generalLayout.styles";
import Header from "./Header/header";
import { MainContext } from "@/context";
import { fetchUser } from "@/network/auth";
import { CURRENT_USER, TOAST_BOX } from "@/context/types";
import {
  getDataInCookie,
  storeDataInCookie,
} from "@/data-helpers/auth-session";
import { handleGenerateUniqueCartKey } from "@/network/cart";
import _ from "lodash";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
  title = false,
  contextTitle = false,
  isAuth = false,
}) {
  const { dispatch, pageTitle, user } = useContext(MainContext);
  const effectRan = useRef(false);



  return (
    <>
      <GeneralLayoutWrapper>
        {!noHeader && <Header />}
        {contextTitle && <h1 className="page__title">{pageTitle}</h1>}
        <> {title && <h1 className="page__title">{title}</h1>}</>

        {children}
      </GeneralLayoutWrapper>
      {!noFooter && <Footer />}
    </>
  );
}
