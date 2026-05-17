import { FlexibleDiv } from "@/components/lib/Box/styles";
import React, { useEffect, useState, useMemo } from "react";
import { AiFillStar as StarIcon } from "react-icons/ai";
import { MoreReviewsWrapper } from "./moreReviews.styles";
import { ConfigProvider, Pagination, Slider } from "antd";
import ReviewDetails from "./reviewDetails";
import { getAllReviews } from "@/network/reviews";
import { IoIosArrowRoundBack } from "react-icons/io";

function StarRow({ rating = 0, fontSize = "28px", justifyContent = "center", gap = "4px" }) {
  const filled = Math.round(rating);
  return (
    <FlexibleDiv justifyContent={justifyContent} gap={gap} style={{ fontSize }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} color={i <= filled ? "#FCCB1B" : "#BBBBBB"} />
      ))}
    </FlexibleDiv>
  );
}

function RatingBar({ number, percent, size }) {
  return (
    <FlexibleDiv width="100%" padding="0">
      <FlexibleDiv flexWrap="nowrap" justifyContent="start" gap="12px" className="slider_percent">
        <FlexibleDiv width="fit-content" flexWrap="nowrap">
          <p>{number}</p>
          <StarIcon color="#FCCB1B" />
        </FlexibleDiv>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                trackBgDisabled: "#D24545",
                trackBg: "#D24545",
                trackHoverBg: "#D24545",
                handleColor: "#D24545",
                dotSize: "0px",
                handleSize: 10,
                handleSizeHover: 0,
                railSize: size || 19,
              },
            },
          }}
        >
          <Slider value={Number(percent) || 0} max={100} range={false} draggableTrack={false} style={{ width: 200 }} />
        </ConfigProvider>
        <p className="slider__percent">{percent}%</p>
      </FlexibleDiv>
    </FlexibleDiv>
  );
}

export const MoreReviews = ({ id, reviewData, starData, setMoreReviewsActive }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageReviews, setPageReviews] = useState(reviewData || []);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const data = await getAllReviews(id, currentPage);
      setPageReviews(data?.body?.reviews || []);
    };
    fetch();
  }, [id, currentPage]);

  // Build star distribution safely
  const percentages = useMemo(() => {
    const raw = starData?.productRatingPercentage;
    if (!raw) return ["0", "0", "0", "0", "0"];
    const vals = Object.values(raw);
    return [0, 1, 2, 3, 4].map((i) =>
      String(vals[i] || "0").replace(".00", "")
    );
  }, [starData]);

  // Average rating from starData or fallback to review data
  const averageRating = useMemo(() => {
    const total = pageReviews.length;
    if (!total) return 0;
    const sum = pageReviews.reduce((acc, r) => acc + (r?.productRating || 0), 0);
    return parseFloat((sum / total).toFixed(1));
  }, [pageReviews]);

  const starDetails = [1, 2, 3, 4, 5].map((n, idx) => ({
    id: n,
    percent: percentages[idx],
  }));

  return (
    <MoreReviewsWrapper>
      {/* Left: summary */}
      <FlexibleDiv className="left__section" gap="16px">
        {/* Desktop header */}
        <div className="desktop_header">
          <FlexibleDiv gap="8px">
            <h1 className="customer__review">Customer Reviews</h1>
            <p>Here is what our customers are saying</p>
          </FlexibleDiv>
          <FlexibleDiv flexDir="column" gap="8px">
            <h1>{averageRating}</h1>
            <StarRow rating={averageRating} />
            <p>
              {pageReviews.length > 1
                ? `${pageReviews.length} reviews`
                : `${pageReviews.length} review`}
            </p>
          </FlexibleDiv>
          <FlexibleDiv margin="0 0 0 32px">
            {starDetails.map((item) => (
              <RatingBar key={item.id} number={item.id} percent={item.percent} />
            ))}
          </FlexibleDiv>
        </div>

        {/* Mobile header */}
        <div className="mobile_header">
          <FlexibleDiv justifyContent="start" className="heading__text__wrapper" gap="12px">
            <FlexibleDiv onClick={setMoreReviewsActive} width="fit-content" style={{ fontSize: 34 }}>
              <IoIosArrowRoundBack />
            </FlexibleDiv>
            <h2 className="heading__text">Customer Reviews</h2>
          </FlexibleDiv>
          <FlexibleDiv flexWrap="nowrap">
            <FlexibleDiv flexDir="column" gap="12px" alignItems="start">
              <p>Here is what our customers are saying</p>
              <h3>{averageRating}/5</h3>
              <StarRow rating={averageRating} fontSize="18px" justifyContent="start" gap="0" />
              <p>
                {pageReviews.length > 1
                  ? `${pageReviews.length} reviews`
                  : `${pageReviews.length} review`}
              </p>
            </FlexibleDiv>
            <FlexibleDiv>
              {starDetails.map((item) => (
                <RatingBar key={item.id} number={item.id} percent={item.percent} size={10} />
              ))}
            </FlexibleDiv>
          </FlexibleDiv>
        </div>
      </FlexibleDiv>

      {/* Right: review list */}
      <FlexibleDiv margin="0 12px">
        <div className="mobile__review__container">
          <ReviewDetails reviews={pageReviews} />
        </div>
        <FlexibleDiv flexWrap="nowrap" className="pagination">
          <Pagination
            onChange={(page) => setCurrentPage(page)}
            current={currentPage}
            total={pageReviews.length}
            pageSize={5}
          />
        </FlexibleDiv>
      </FlexibleDiv>
    </MoreReviewsWrapper>
  );
};
