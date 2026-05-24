import { useState } from "react";
import styled from "styled-components";
import { AiFillStar as StarIcon } from "react-icons/ai";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useMyReviewsQuery, useUpdateReview, useDeleteReview } from "@/network/reviews";
import toast, { Toaster } from "react-hot-toast";

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  font-family: Inter, sans-serif;
  padding: 20px 0 40px;

  .page__header {
    margin-bottom: 24px;
    h2 { font-size: 24px; font-weight: 700; color: #212121; margin: 0 0 4px; }
    p  { font-size: 13px; color: #9E9E9E; margin: 0; }
  }

  .empty__state {
    text-align: center; padding: 60px 20px;
    .icon { font-size: 48px; margin-bottom: 12px; }
    h4 { font-size: 16px; font-weight: 600; color: #333; margin: 0 0 6px; }
    p  { font-size: 13px; color: #9E9E9E; margin: 0; }
  }

  .review__card {
    border: 1px solid #F0F0F0;
    border-radius: 12px;
    padding: 18px 20px;
    margin-bottom: 12px;
    background: #fff;

    .card__top {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 10px;
      gap: 12px;
    }

    .product__name {
      font-size: 13px; font-weight: 600; color: #212121;
      margin: 0 0 4px;
    }

    .review__text {
      font-size: 13px; color: #555; margin: 0;
      line-height: 1.5;
    }

    .review__date {
      font-size: 11px; color: #BBBBBB; margin-top: 4px;
    }

    .card__actions {
      display: flex; gap: 8px; flex-shrink: 0;
    }
  }

  .stars__row {
    display: flex; gap: 2px; margin-bottom: 6px;
  }

  .btn {
    height: 32px; padding: 0 14px; border-radius: 6px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    font-family: inherit; border: none; transition: opacity .15s;
    &:hover { opacity: 0.85; }
    &:disabled { opacity: 0.45; cursor: not-allowed; }
  }
  .btn--edit   { background: #F5F5F5; color: #212121; }
  .btn--delete { background: #FEF2F2; color: #B91C1C; }
  .btn--save   { background: #D24545; color: #fff; }
  .btn--cancel { background: #F5F5F5; color: #555; }

  .edit__form {
    margin-top: 12px; border-top: 1px solid #F5F5F5; padding-top: 14px;

    .rating__picker {
      display: flex; gap: 4px; margin-bottom: 12px; cursor: pointer;
    }

    textarea {
      width: 100%; min-height: 80px; padding: 10px 12px;
      border: 1px solid #E0E0E0; border-radius: 8px;
      font-size: 13px; font-family: inherit; resize: vertical;
      color: #212121; outline: none; box-sizing: border-box;
      &:focus { border-color: #D24545; }
    }

    .form__actions {
      display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end;
    }
  }

  .confirm__overlay {
    margin-top: 12px; border-top: 1px solid #FEE2E2; padding-top: 14px;
    background: #FEF2F2; border-radius: 0 0 10px 10px; padding: 14px 16px;

    p { font-size: 13px; color: #B91C1C; margin: 0 0 10px; font-weight: 500; }
    .confirm__btns { display: flex; gap: 8px; }
  }

  .pagination {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; margin-top: 24px;

    .page__btn {
      display: flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 8px;
      border: 1px solid #E0E0E0; background: #fff;
      cursor: pointer; color: #555; transition: all .15s;
      &:hover:not(:disabled) { border-color: #D24545; color: #D24545; }
      &:disabled { opacity: 0.35; cursor: not-allowed; }
    }

    .page__info {
      font-size: 13px; color: #555;
      span { font-weight: 700; color: #212121; }
    }
  }
`;

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="rating__picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          size={22}
          color={(hovered || value) >= n ? "#FCCB1B" : "#E0E0E0"}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [editText, setEditText] = useState(review.review || "");
  const [editRating, setEditRating] = useState(review.productRating || 5);

  const updateMutation = useUpdateReview(review.productId?.id);
  const deleteMutation = useDeleteReview(review.productId?.id);

  const productName = review.productId?.productName || review.productName || "Product";
  const formattedDate = review.reviewDate || "";

  const handleSave = async () => {
    if (!editText.trim()) return;
    try {
      await updateMutation.mutateAsync({ id: review.id, review: editText.trim(), productRating: editRating });
      toast.success("Review updated.");
      setEditing(false);
    } catch {
      toast.error("Failed to update review. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(review.id);
      toast.success("Review deleted.");
      setConfirming(false);
    } catch {
      toast.error("Failed to delete review. Please try again.");
    }
  };

  return (
    <div className="review__card">
      <div className="card__top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="product__name">{productName}</p>
          <div className="stars__row">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} size={13} color={i <= (review.productRating || 0) ? "#FCCB1B" : "#E0E0E0"} />
            ))}
          </div>
          {review.review && <p className="review__text">&ldquo;{review.review}&rdquo;</p>}
          {formattedDate && <p className="review__date">{formattedDate}</p>}
        </div>

        {!editing && !confirming && (
          <div className="card__actions">
            <button className="btn btn--edit" onClick={() => { setEditText(review.review || ""); setEditRating(review.productRating || 5); setEditing(true); }}>
              Edit
            </button>
            <button className="btn btn--delete" onClick={() => setConfirming(true)}>
              Delete
            </button>
          </div>
        )}
      </div>

      {editing && (
        <div className="edit__form">
          <StarPicker value={editRating} onChange={setEditRating} />
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Update your review…"
          />
          <div className="form__actions">
            <button className="btn btn--cancel" onClick={() => setEditing(false)}>Cancel</button>
            <button
              className="btn btn--save"
              disabled={!editText.trim() || updateMutation.isPending}
              onClick={handleSave}
            >
              {updateMutation.isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}

      {confirming && (
        <div className="confirm__overlay">
          <p>Are you sure you want to delete this review? This cannot be undone.</p>
          <div className="confirm__btns">
            <button className="btn btn--cancel" onClick={() => setConfirming(false)}>Keep it</button>
            <button
              className="btn btn--delete"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
              {deleteMutation.isPending ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyReviews() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyReviewsQuery(page);

  const reviews    = data?.body?.reviews || [];
  const pagination = data?.body?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const total      = pagination.total || 0;

  return (
    <Wrapper>
      <Toaster />
      <div className="page__header">
        <h2>My Reviews</h2>
        <p>Manage reviews you have left on products</p>
      </div>

      {isLoading ? (
        <p style={{ color: "#BBBBBB", fontSize: 14, textAlign: "center", padding: 40 }}>Loading…</p>
      ) : reviews.length === 0 ? (
        <div className="empty__state">
          <div className="icon">⭐</div>
          <h4>No reviews yet</h4>
          <p>After purchasing a product, share your experience to help other buyers.</p>
        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <ReviewCard key={review.id || review._id} review={review} />
          ))}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page__btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <IoChevronBackOutline size={15} />
              </button>
              <p className="page__info">
                Page <span>{page}</span> of <span>{totalPages}</span>
                <span style={{ color: "#BBBBBB", fontWeight: 400 }}> &nbsp;({total} reviews)</span>
              </p>
              <button
                className="page__btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <IoChevronForwardOutline size={15} />
              </button>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
}
