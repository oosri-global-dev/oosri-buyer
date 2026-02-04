import React from "react";
import Image from "next/image";
import { NameTagWrapper } from "./orderComponent.styled";

export const NameTag = ({ name = "Deskmound Gadget", image = "https://placehold.co/24x24" }) => {
  return(
    <NameTagWrapper>
      <div className="content">
        <Image src={image} alt={name} width={24} height={24} />
        <p>{name}</p>
      </div>
    </NameTagWrapper>
  );
};
