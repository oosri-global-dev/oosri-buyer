import React, { useMemo, useRef, useState, useEffect } from "react";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";

export default function ProductCarousel({
  content = [],
  carouselTitle = "",
  loading = false,
  hideIfEmpty = false,
  onViewMore,
}) {
  const scrollerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = windowWidth !== null && windowWidth <= 600;

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
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    if (atEnd) {
      if (typeof onViewMore === "function") onViewMore();
      return;
    }
    scrollByCards("next");
  };

  const handlePrev = () => scrollByCards("prev");

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

  const gridCols =
    windowWidth !== null && windowWidth <= 390
      ? "repeat(auto-fill, minmax(120px, 1fr))"
      : "repeat(auto-fill, minmax(140px, 1fr))";

  const scrollerStyle = isMobile
    ? {
        display: "grid",
        gridTemplateColumns: gridCols,
        gap: 12,
      }
    : {
        display: "flex",
        gap: 14,
        overflowX: "auto",
        paddingBottom: 8,
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      };

  const cardStyle = isMobile ? {} : { minWidth: 220, flex: "0 0 auto" };

  return (
    <section style={{ width: "100%", marginTop: 20 }}>
      {carouselTitle ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#1a1a1a" }}>{carouselTitle}</h3>
          {onViewMore && (
            <button
              type="button"
              onClick={onViewMore}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--orrsiPrimary)",
                padding: 0,
                whiteSpace: "nowrap",
              }}
            >
              View All →
            </button>
          )}
        </div>
      ) : null}

      <div style={{ position: "relative" }}>
        {!isMobile && (
          <button
            type="button"
            onClick={handlePrev}
            style={{ ...arrowStyle, left: -18 }}
            aria-label="Previous"
          >
            ←
          </button>
        )}

        <div ref={scrollerRef} style={scrollerStyle}>
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} style={cardStyle}>
                  <LoadingCard />
                </div>
              ))
            : normalizedContent.map((card, idx) => (
                <div key={card?._id || `carousel-card-${idx}`} style={cardStyle}>
                  <ProductCard card={card} />
                </div>
              ))}
        </div>

        {!isMobile && (
          <button
            type="button"
            onClick={handleNext}
            style={{ ...arrowStyle, right: -18 }}
            aria-label="Next"
          >
            →
          </button>
        )}
      </div>
    </section>
  );
}
