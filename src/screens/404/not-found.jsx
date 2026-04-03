import Image from "next/image";
import { NFWrapper } from "./not-found.styles";
import NotFoundImage from "@/assets/images/404/404-image.svg";

export default function NotFound() {
  return (
    <NFWrapper>
      <Image
        className="not__found__image"
        alt="not-found"
        src={NotFoundImage}
      />
      <h2>Ooops!</h2>
      <p className="not__found__text">
        We{`'`}re sorry for the inconvenience. The page you{`'`}re looking for
        is currently undergoing maintenance to provide you with an even better
        shopping experience.
      </p>
    </NFWrapper>
  );
}
