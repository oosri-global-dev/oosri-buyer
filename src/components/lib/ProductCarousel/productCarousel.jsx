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

<<<<<<< HEAD
    // if already at end, redirect (your requirement)
=======
>>>>>>> dadac6ae3e42be6c348c3808c1c5b93e79b835f9
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    if (atEnd) {
      if (typeof onViewMore === "function") onViewMore();
      return;
    }

    scrollByCards("next");
  };

  const handlePrev = () => scrollByCards("prev");
<<<<<<< HEAD

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
=======

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    fontSize: 16,
  };

  return (
    <section style={{ width: "100%", marginTop: 20 }}>
      {/* Title row — no arrows here anymore */}
      {carouselTitle ? (
        <h3 style={{ margin: "0 0 12px 0" }}>{carouselTitle}</h3>
      ) : null}

      {/* Wrapper that positions arrows on the sides */}
      <div style={{ position: "relative" }}>

        {/* Left arrow */}
        <button
          type="button"
          onClick={handlePrev}
          style={{ ...arrowStyle, left: -18 }}
          aria-label="Previous"
        >
          ←
        </button>

        {/* Scrollable cards */}
        <div
          ref={scrollerRef}
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            paddingBottom: 8,
            scrollBehavior: "smooth",
            // Hide scrollbar visually
            scrollbarWidth: "none",
            msOverflowStyle: "none",
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

        {/* Right arrow */}
        <button
          type="button"
          onClick={handleNext}
          style={{ ...arrowStyle, right: -18 }}
          aria-label="Next"
        >
          →
        </button>

>>>>>>> dadac6ae3e42be6c348c3808c1c5b93e79b835f9
      </div>
    </section>
  );
}