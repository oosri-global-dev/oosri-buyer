import { FlexibleDiv } from '@/components/lib/Box/styles'
import React, { useState } from 'react'
import { AiFillStar as LikeIcon } from "react-icons/ai";
import ProductReviewBox from '../product-reviews/productReview';

export const MoreReviews = () => {
const StarRating = ({ rating, totalStars = 5 }) => {
    const filledStars = Math.round(rating); // Round to nearest integer
    return (
        <div>
        {Array.from({ length: totalStars }, (_, index) => (
            <LikeIcon key={index} color={index < filledStars ? "#FCCB1B":"#BBBBBB"} />
        ))}
        </div>
    );
};

  const reviews = [
    {
      reviewerName: "Mike Tyson",
      likes: 4,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
    },
    {
      reviewerName: "Mike Tyson",
      likes: 3,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
    },
    {
      reviewerName: "Mike Tyson",
      likes: 5,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
    },
    {
      reviewerName: "Mike Tyson",
      likes: 1,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
    },
  ];

  return (
    <FlexibleDiv >
        <FlexibleDiv>
          {/* <YellowStar /> */}
            <StarRating rating={3} />
        </FlexibleDiv>
        {/*  right section*/}
        <FlexibleDiv>
            <ProductReviewBox reviews={reviews} />
        </FlexibleDiv>
    </FlexibleDiv>
  )
}
