import { useRef } from "react";
import { SDWrapper } from "./productsGridBox.styles";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";
import Link from "next/link";

export default function ProductsGridBox({
  content = [],
  sectionTitle = "",
  showViewAll = true,
  loading = false,
  onViewMore,
}) {
  const scrollerRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(240, el.clientWidth * 0.75);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontSize: 15,
    flexShrink: 0,
  };

  return (
    <SDWrapper>
      <div className="section__header">
        <h2>{sectionTitle}</h2>
        {showViewAll && (
          <Link className="view__all__style" href="/shop">
            View All
          </Link>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <button type="button" className="scroll__arrow scroll__arrow--prev" onClick={() => scroll("prev")} style={{ ...arrowStyle, left: -17 }} aria-label="Previous">
          ←
        </button>

        <div className="cards__scroller" ref={scrollerRef}>
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="card__slot">
                  <LoadingCard />
                </div>
              ))
            : content.map((card, idx) => (
                <div key={card?._id || `grid-card-${idx}`} className="card__slot">
                  <ProductCard card={card} />
                </div>
              ))}
        </div>

        <button type="button" className="scroll__arrow scroll__arrow--next" onClick={() => scroll("next")} style={{ ...arrowStyle, right: -17 }} aria-label="Next">
          →
        </button>
      </div>
    </SDWrapper>
  );
}
