import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SingleCategoryBox({ data }) {
  const { push } = useRouter();
  return (
    <SingleCategoryBoxWrapper
      onClick={() => push(`/shop?category=${encodeURIComponent(data.name)}`)}
    >
      <div className="category__image__fill">
        <Image
          src={data.image || "/images/homepage/default.png"}
          alt={data.name || "category"}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 430px) 30vw, (max-width: 720px) 20vw, 180px"
        />
      </div>
      <div className="category__overlay">
        <p className="category__name">{data.name}</p>
      </div>
    </SingleCategoryBoxWrapper>
  );
}
