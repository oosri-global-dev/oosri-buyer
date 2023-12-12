import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Image from "next/image";

export default function SingleCategoryBox({ data, key }) {
  return (
    <SingleCategoryBoxWrapper key={key}>
      <Image
        className="category__image"
        src={data.image}
        alt="single-category"
      />
      <p className="category__name">{data.name}</p>
    </SingleCategoryBoxWrapper>
  );
}
