import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ProductReviewWrapper } from "./productReview.styles";
import Image from "next/image";
import ReviewerImage from "@/assets/images/product-related/reviewer-image.png";
// import ReviewerImage from "@/assets/images/phone9.png";
import { AiFillStar as LikeIcon } from "react-icons/ai";

export default function ProductReviewBox({ reviews }) {
  return (
    <>
      {reviews.map((review, index, elements) => (
        <ProductReviewWrapper
          key={index}
          isLastElem={index === elements?.length - 1 ? true : false}
        >
          <FlexibleDiv className="reviewer__image__wrapper">
            <Image alt="reviewer__dp"  
              width={50}
              height={50}
            src={review?.reviewerImage} />
          </FlexibleDiv>
          <FlexibleDiv
            className="reviewer__content__wrapper"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
            gap="4px"
          >
            <FlexibleDiv
              flexWrap="nowrap"
              flexDir="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <FlexibleDiv className="reviewer__image__wrapper__mobile">
                <Image alt="reviewer__dp" 
                  width={50}
                  height={50}
                src={review?.reviewerImage} />
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
          </FlexibleDiv>
        </ProductReviewWrapper>
      ))}
    </>
  );
}
