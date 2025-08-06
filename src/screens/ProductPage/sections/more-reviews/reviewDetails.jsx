import { FlexibleDiv } from "@/components/lib/Box/styles";
import Image from "next/image";
import ReviewerImage from "@/assets/images/product-related/reviewer-image.png";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { ProductReviewWrapper } from "../product-reviews/productReview.styles";
import { ReviewDetailWrapper } from "./moreReviews.styles";

export default function ReviewDetails({ reviews }) {
  return (
    <ReviewDetailWrapper>
      {reviews?.map((review, index, elements) => (
        <ProductReviewWrapper
          key={index}
          isLastElem={index === elements?.length - 1 ? true : false}
        >
          <FlexibleDiv className="reviewer__image__wrapper">
            <Image alt="reviewer__dp" src={review?.reviewerImage} width={35} height={35} />
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
                <Image alt="reviewer__dp" src={review?.reviewerImage} width={35} height={35} />
              </FlexibleDiv>
              <FlexibleDiv
                flexDir="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <p className="reviewer__name">{review?.reviewer}</p>
                <FlexibleDiv flexWrap="nowrap" justifyContent="flex-start">
                  {new Array(review?.productRating || 1).fill(null).map((sgn, idx) => (
                    <LikeIcon color="#FCCB1B" key={idx} />
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
