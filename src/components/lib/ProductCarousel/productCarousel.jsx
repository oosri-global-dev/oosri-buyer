import React, { useMemo, useRef } from "react";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";

/**
 * Props expected:
 * - content: array
 * - carouselTitle: string
 * - loading: boolean
 * - hideIfEmpty: boolean
 * - onViewMore: function (optional)
 */
export default function ProductCarousel({
  content = [],
  carouselTitle = "",
  loading = false,
  hideIfEmpty = false,
  onViewMore,
}) {
  const scrollerRef = useRef(null);

  const normalizedContent = useMemo(() => {
    const list = Array.isArray(content) ? content : [];
    return list.map((item) => {
      if (item?.type === "VIEW_MORE") return item;

      if (item?.__type === "VIEW_MORE") {
        return {
          type: "VIEW_MORE",
          title: "View all",
          onClick: () => {
            if (typeof onViewMore === "function") onViewMore();
          },
        };
      }

      return item;
    });
  }, [content, onViewMore]);

  const isActuallyEmpty =
    !loading &&
    (!normalizedContent || normalizedContent.length === 0);

  if (hideIfEmpty && isActuallyEmpty) return null;

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(280, el.clientWidth * 0.8);
    el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  };

  const handleNext = () => {
    const el = scrollerRef.current;
    if (!el) return;

    // if already at end, redirect (your requirement)
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    if (atEnd) {
      if (typeof onViewMore === "function") onViewMore();
      return;
    }

    scrollByCards("next");
  };

  const handlePrev = () => scrollByCards("prev");

  return (
    <section style={{ width: "100%", marginTop: 20 }}>
      {carouselTitle ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{carouselTitle}</h3>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "#fff",
                cursor: "pointer",
              }}
              aria-label="Previous"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "#fff",
                cursor: "pointer",
              }}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          paddingBottom: 8,
          marginTop: 12,
          scrollBehavior: "smooth",
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} style={{ minWidth: 220, flex: "0 0 auto" }}>
                <LoadingCard />
              </div>
            ))
          : normalizedContent.map((card, idx) => (
              <div key={card?._id || `carousel-card-${idx}`} style={{ minWidth: 220, flex: "0 0 auto" }}>
                <ProductCard card={card} />
              </div>
            ))}
      </div>
    </section>
  );
}