import { nairaFormatter } from "@/data-helpers/hooks";
import { FlexibleDiv } from "../../Box/styles";
import { SingleCardWrapper } from "./singleCard.styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { useRouter } from "next/router";

export function LoadingSingleGridCard({ key }) {
  return (
    <SingleCardWrapper key={key}>
      <SkeletonTheme
        baseColor="rgba(148, 148, 148, 0.1)"
        highlightColor="rgba(202, 202, 202, 0.4)"
      >
        <FlexibleDiv className="img__wrapper" style={{ position: "relative" }}>
          <Skeleton style={{ height: "100%" }} className="skeleton" />
        </FlexibleDiv>
        <FlexibleDiv className="product__info">
          <Skeleton style={{ width: "80%", height: 18, marginBottom: 6 }} />
          <div
            className="price__wrapper"
            style={{ width: "100%", display: "flex", gap: 10 }}
          >
            <Skeleton style={{ width: 60, height: 16 }} />
            <Skeleton style={{ width: 40, height: 14 }} />
          </div>
          <div
            className="likes__wrapper"
            style={{ width: 60, display: "flex", gap: 2 }}
          >
            <Skeleton style={{ width: 40, height: 12 }} />
            <Skeleton style={{ width: 20, height: 12 }} />
          </div>
        </FlexibleDiv>
      </SkeletonTheme>
    </SingleCardWrapper>
  );
}

export default function SingleGridCard({ key, product, isLoading = false }) {
  const maxLikes = ["", "", "", "", ""];
  const { push } = useRouter();

  if (isLoading) {
    return <LoadingSingleGridCard key={key} />;
  } else {
    return (
      <>
        <SingleCardWrapper
          key={key}
          onClick={() => push(`/product/${product?._id}`)}
        >
          <FlexibleDiv className="img__wrapper">
            <Image
              src={product?.productImages[0]}
              alt={`${product?._id} product image`}
              layout="fill"
              objectFit="cover"
            />
          </FlexibleDiv>
          <FlexibleDiv className="product__info">
            <p className="device__name">{product?.productName || ""}</p>
            <FlexibleDiv
              flexDir="row"
              justifyContent="flex-start"
              className="price__wrapper"
            >
              <p className="product__price__grid">
                {nairaFormatter.format(product?.productPrice || 0)}
              </p>
              {product?.previousPrice && (
                <p className="discounted__price__grid">
                  {nairaFormatter.format(product?.previousPrice || 0)}
                </p>
              )}
            </FlexibleDiv>

            <div className="likes__wrapper">
              {maxLikes.map((like, idx) => (
                <LikeIcon
                  className={`= ${maxLikes.length}`}
                  size={8}
                  fill={`${
                    product?.productRating >= idx + 1 ? "#FCCB1B" : "#BDBDBD"
                  }`}
                  key={idx}
                />
              ))}
              <p className="likes__number">{product?.productRating}.0</p>
            </div>
          </FlexibleDiv>
        </SingleCardWrapper>
      </>
    );
  }
}
