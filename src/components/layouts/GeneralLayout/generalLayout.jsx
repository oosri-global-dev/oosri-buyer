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

  useEffect(() => {
    if (effectRan.current === false) {
      const userToken = getDataInCookie("access_token");
      const publicCartKey = getDataInCookie("public__cart__key");
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

      //if user is not logged in
      if (_.isEmpty(user)) {
        if (!publicCartKey) {
          try {
            const handlePublicUser = async () => {
              //if it fails, generate a cart key for public user
              const res = await handleGenerateUniqueCartKey();

              if (res?.body?.cartKey) {
                storeDataInCookie("public__cart__key", res?.body?.cartKey);
              }
            };

            handlePublicUser();
          } catch (err) {
            dispatch({
              type: TOAST_BOX,
              payload: {
                type: "error",
                message: "Error generating a cart key on your device",
              },
            });
          }
        }
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [dispatch, user]);

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
