import { FlexibleDiv } from "@/components/lib/Box/styles";
import { AiFillStar as StarIcon } from "react-icons/ai";
import { ProductReviewWrapper } from "../product-reviews/productReview.styles";
import { ReviewDetailWrapper } from "./moreReviews.styles";

function ReviewerAvatar({ name, size = 35 }) {
  const initials = (name || "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: "#F5F5F5", color: "#555",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.38, fontWeight: 700, flexShrink: 0,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

export default function ReviewDetails({ reviews }) {
  return (
    <ReviewDetailWrapper>
      {reviews?.map((review, index, elements) => (
        <ProductReviewWrapper
          key={index}
          isLastElem={index === elements?.length - 1 ? true : false}
        >
          <FlexibleDiv className="reviewer__image__wrapper">
            <ReviewerAvatar name={review?.reviewer} />
          </FlexibleDiv>
          <FlexibleDiv
            className="reviewer__content__wrapper"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
            gap="10px"
          >
            <FlexibleDiv
              flexWrap="nowrap"
              flexDir="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <FlexibleDiv className="reviewer__image__wrapper__mobile">
                <ReviewerAvatar name={review?.reviewer} />
              </FlexibleDiv>
              <FlexibleDiv
                flexDir="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <p className="reviewer__name">{review?.reviewer}</p>
                <FlexibleDiv flexWrap="nowrap" justifyContent="flex-start">
                  {new Array(review?.productRating || 1).fill(null).map((sgn, idx) => (
                    <StarIcon color="#FCCB1B" key={idx} />
                  ))}
                </FlexibleDiv>
              </FlexibleDiv>
            </FlexibleDiv>

            <p className="reviewer__content">{review?.review}</p>
            <p className="date_number">{review?.reviewDate}</p>
          </FlexibleDiv>
        </ProductReviewWrapper>
      ))}
    </ReviewDetailWrapper>
  );
}
