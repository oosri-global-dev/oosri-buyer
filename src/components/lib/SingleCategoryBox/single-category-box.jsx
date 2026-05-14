import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SingleCategoryBox({ data }) {
  const { push } = useRouter();
  return (
    <SingleCategoryBoxWrapper
      onClick={() => push(`/shop?category=${encodeURIComponent(data.name)}`)}
    >
      {/* position:relative container required for Next.js fill */}
      <div className="img__area">
        <Image
          src={data.image || "/images/homepage/default.png"}
          alt={data.name || "category"}
          fill
          style={{ objectFit: "contain", padding: "14px" }}
          sizes="(max-width: 430px) 110px, (max-width: 720px) 130px, 160px"
        />
      </div>
      <div className="name__area">
        <p className="category__name">{data.name}</p>
      </div>
    </SingleCategoryBoxWrapper>
  );
}
