import { useEffect, useContext } from "react";
import Footer from "./Footer/footer";
import { GeneralLayoutWrapper } from "./generalLayout.styles";
import Header from "./Header/header";
import { MainContext } from "@/context";
import { fetchUser } from "@/network/auth";
import { CURRENT_USER } from "@/context/types";
import { getDataInCookie } from "@/data-helpers/auth-session";

export default function GeneralLayout({
  children,
  noFooter = false,
  noHeader = false,
  title = false,
  contextTitle = false,
  isAuth = false,
}) {
  const {
    dispatch,
    state: { pageTitle, user },
  } = useContext(MainContext);

  useEffect(() => {
    const userToken = getDataInCookie("access_token");
    if (userToken) {
      const FetchCurrentUser = async () => {
        try {
          const currentUser = await fetchUser();
          //dispatch the user function
          dispatch({
            type: CURRENT_USER,
            payload: {
              ...currentUser?.body?.user,
              lastLogin: currentUser?.body?.lastLogin,
            },
          });
        } catch (err) {}
      };

      FetchCurrentUser();
    }
  }, [dispatch]);

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
