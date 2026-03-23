import React from "react";
import SafeImage from '@/components/lib/SafeImage/SafeImage';
import { NameTagWrapper } from "./orderComponent.styled";

export const NameTag = ({ name = "Deskmound Gadget", image = "/images/placeholder.svg" }) => {
  return (
    <NameTagWrapper>
      <div className="content">
            <SafeImage
                src={image}
                alt={name}
                width={30}
                height={30}
                className='vendor_image'
            />
        <p>{name}</p>
      </div>
    </NameTagWrapper>
  );
};
