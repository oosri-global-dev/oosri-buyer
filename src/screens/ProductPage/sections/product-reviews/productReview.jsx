import { AiFillStar as StarIcon } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ReviewCard({ review }) {
  const name = review?.reviewer || "Anonymous";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
  const rating = review?.productRating || 0;

  const formattedDate = review?.reviewDate
    ? new Date(review.reviewDate).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      })
    : null;

  return (
    <div className="review__card">
      <div className="review__header">
        <div className="reviewer__avatar">{initials}</div>
        <div className="reviewer__meta">
          <p className="reviewer__name">{name}</p>
          <div className="reviewer__stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} size={12} color={i <= rating ? "#FCCB1B" : "#e0e0e0"} />
            ))}
          </div>
        </div>
        {formattedDate && <span className="review__date">{formattedDate}</span>}
      </div>
      {review?.review && <p className="review__text">{review.review}</p>}
    </div>
  );
}

export default function ProductReviewBox({ reviews = [], loading = false, onSeeMore }) {
  if (loading) {
    return (
      <SkeletonTheme baseColor="rgba(148,148,148,0.08)" highlightColor="rgba(202,202,202,0.3)">
        <div className="reviews__list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="review__card">
              <div className="review__header" style={{ gap: 10 }}>
                <Skeleton circle width={40} height={40} />
                <div style={{ flex: 1 }}>
                  <Skeleton style={{ width: "40%", height: 13, marginBottom: 6 }} />
                  <Skeleton style={{ width: "25%", height: 11 }} />
                </div>
              </div>
              <Skeleton style={{ width: "85%", height: 13, marginTop: 10 }} />
              <Skeleton style={{ width: "60%", height: 13, marginTop: 4 }} />
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  if (!reviews.length) {
    return (
      <div className="reviews__empty">
        <p>No reviews yet. Be the first to review this product.</p>
      </div>
    );
  }

  return (
    <div className="reviews__list">
      {reviews.map((review, idx) => (
        <ReviewCard key={review?._id || idx} review={review} />
      ))}
      {onSeeMore && (
        <button type="button" className="see__all__btn" onClick={onSeeMore}>
          See all reviews →
        </button>
      )}
    </div>
  );
}
