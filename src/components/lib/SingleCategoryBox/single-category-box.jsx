import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SingleCategoryBox({ data, key }) {
  const { push } = useRouter();
  return (
    <SingleCategoryBoxWrapper
      key={key}
      onClick={() => push(`/shop?category=${encodeURIComponent(data.name)}`)}
    >
      <div className="category__image">
        <Image
          src={data.image || "/images/homepage/default.png"}
          alt="single-category"
          fill
          objectFit="cover"
        />
      </div>

      <p className="category__name">{data.name}</p>
    </SingleCategoryBoxWrapper>
  );
}
