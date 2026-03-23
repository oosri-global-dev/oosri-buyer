import React from "react";
<<<<<<< HEAD
import Image from "next/image";
=======
import SafeImage from '@/components/lib/SafeImage/SafeImage';
>>>>>>> dadac6ae3e42be6c348c3808c1c5b93e79b835f9
import { NameTagWrapper } from "./orderComponent.styled";

export const NameTag = ({ name = "Deskmound Gadget", image = "https://placehold.co/24x24" }) => {
  return(
    <NameTagWrapper>
      <div className="content">
<<<<<<< HEAD
        <Image src={image} alt={name} width={24} height={24} />
=======
            <SafeImage
                src={image}
                alt={name}
                width={30}
                height={30}
                className='vendor_image'
            />
>>>>>>> dadac6ae3e42be6c348c3808c1c5b93e79b835f9
        <p>{name}</p>
      </div>
    </NameTagWrapper>
  );
};
