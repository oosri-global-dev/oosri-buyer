import React, { useMemo } from "react";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";

/**
 * Props expected:
 * - content: array
 * - gridTitle: string
 * - loading: boolean
 * - onViewMore: function (optional)
 */
export default function ProductGrid({
  content = [],
  gridTitle = "",
  loading = false,
  onViewMore,
}) {
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

  return (
    <section style={{ width: "100%", marginTop: 20 }}>
      {gridTitle ? <h3 style={{ margin: 0 }}>{gridTitle}</h3> : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
          marginTop: 12,
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => <LoadingCard key={idx} />)
          : normalizedContent.map((card, idx) => (
              <ProductCard key={card?._id || `grid-card-${idx}`} card={card} />
            ))}
      </div>
    </section>
  );
}