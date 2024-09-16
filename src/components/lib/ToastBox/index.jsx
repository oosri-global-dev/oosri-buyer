import { FlexibleDiv } from "../Box/styles";
import { CustomToastBoxWrapper } from "./index.styles";
import { MdError as ErrorIcon } from "react-icons/md";
import { IoCheckmarkCircle as OkayIcon } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import { TOAST_BOX } from "@/context/types";

export default function Customtoastbox() {
  const {
    dispatch,
    state: { toastbox },
  } = useContext(MainContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastbox) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        dispatch({
          type: TOAST_BOX,
          payload: undefined,
        });
      }, toastbox?.duration || 5000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [toastbox, dispatch]);

  if (!toastbox.type) return null;

  return (
    <CustomToastBoxWrapper
      flexDir="row"
      flexWrap="nowrap"
      justifyContent="flex-start"
      bgColor={toastbox.type === "success" ? "#6DBD28" : "red"}
      isVisible={isVisible}
    >
      {toastbox.type === "success" ? (
        <OkayIcon color="#fff" size={22} />
      ) : (
        <ErrorIcon color="#fff" size={22} />
      )}
      <p className="message">{toastbox.message}</p>
    </CustomToastBoxWrapper>
  );
}
