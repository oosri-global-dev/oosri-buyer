import React from "react";
import { BeatLoader } from "react-spinners";
import ButtonStyle from "./styles";

const Button = ({ children, loading, disabled, loaderColor, color, ...props }) => {
  return (
    <ButtonStyle disabled={disabled || loading} color={color} {...props}>
      {loading ? (
        <BeatLoader color={loaderColor || color || "#fff"} size={10} />
      ) : (
        <span>{children}</span>
      )}
    </ButtonStyle>
  );
};

export default Button;
