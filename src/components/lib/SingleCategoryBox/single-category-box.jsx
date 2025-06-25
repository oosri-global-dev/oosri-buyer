import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Image from "next/image";
import { LoadingCategoryBox } from "./loading-category-box";

export default function SingleCategoryBox({ data, key }) {
  return (
    <SingleCategoryBoxWrapper key={key}>
      <img
        className="category__image"
        src={data.image || "/images/homepage/default.png"}
        alt="single-category"
      />
      <p className="category__name">{data.name}</p>
    </SingleCategoryBoxWrapper>
  );
}
