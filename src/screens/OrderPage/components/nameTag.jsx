import React from "react";
import { NameTagWrapper } from "./orderComponent.styled";

export const NameTag = ({ name }) => {
  return(
    <NameTagWrapper>
      <div className="content">
        <img src="https://placehold.co/600x400" />
        <p>Deskmound Gadget</p>
      </div>
    </NameTagWrapper>
  );
};
