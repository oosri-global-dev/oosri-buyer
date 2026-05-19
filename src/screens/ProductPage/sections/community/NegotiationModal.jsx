import React, { useState } from "react";
import { NegotiationModalOverlay, NegotiationModalBox } from "./community.styles";
import { formatCurrency } from "@/data-helpers/hooks";

const OFFER_TYPES = [
  { value: "discount", label: "Price Discount" },
  { value: "bundle", label: "Bundle Deal" },
  { value: "wholesale", label: "Wholesale Rate" },
  { value: "shipping", label: "Free Shipping" },
];

export default function NegotiationModal({ product, seller, onClose, onSubmit, isSubmitting }) {
  const originalPrice = product?.price || product?.productPrice || 0;
  const [offerType, setOfferType] = useState("discount");
  const [requestedPrice, setRequestedPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const minPrice = Math.ceil(originalPrice * 0.30);
  const maxPrice = Math.floor(originalPrice * 0.99);

  const handleSubmit = () => {
    setError("");
    const price = parseFloat(requestedPrice);
    if (!price || isNaN(price)) {
      setError("Please enter a valid price.");
      return;
    }
    if (price < minPrice || price > maxPrice) {
      setError(`Offer must be between ${formatCurrency(minPrice)} and ${formatCurrency(maxPrice)}.`);
      return;
    }

    onSubmit({
      productId: product._id,
      sellerId: seller._id,
      type: offerType,
      originalPrice,
      requestedPrice: price,
      quantity: parseInt(quantity, 10) || 1,
      buyerNote: note,
    });
  };

  return (
    <NegotiationModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <NegotiationModalBox>
        <button className="close__btn" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Make an Offer</h2>

        <div className="offer__types">
          {OFFER_TYPES.map((t) => (
            <label key={t.value} className={offerType === t.value ? "selected" : ""}>
              <input
                type="radio"
                name="offerType"
                value={t.value}
                checked={offerType === t.value}
                onChange={() => setOfferType(t.value)}
              />
              {t.label}
            </label>
          ))}
        </div>

        <div className="price__input__group">
          <label>
            Your Offer Price (Listed: {formatCurrency(originalPrice)})
          </label>
          <input
            type="number"
            placeholder={`e.g. ${Math.ceil(originalPrice * 0.8)}`}
            value={requestedPrice}
            onChange={(e) => setRequestedPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
          <p className="hint">
            Range: {formatCurrency(minPrice)} – {formatCurrency(maxPrice)}
          </p>
        </div>

        <div className="price__input__group">
          <label>Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <textarea
          className="note__input"
          placeholder="Optional note to the seller..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
        />

        <p className="expiry__note">Offers expire after 48 hours if not responded to.</p>

        {error && <p className="error__msg">{error}</p>}

        <button className="submit__btn" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Offer"}
        </button>
      </NegotiationModalBox>
    </NegotiationModalOverlay>
  );
}
