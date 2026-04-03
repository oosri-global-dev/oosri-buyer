import React from "react";
import { BeatLoader } from "react-spinners";
import ButtonStyle from "./styles";

const Button = ({ children, loading, disabled, loaderColor, ...props }) => {
  return (
    <ButtonStyle disabled={disabled || loading} {...props}>
      {loading ? (
        <BeatLoader color={loaderColor || "#fff"} size={10} />
      ) : (
        <span>{children}</span>
      )}
    </ButtonStyle>
  );
};

export default Button;
