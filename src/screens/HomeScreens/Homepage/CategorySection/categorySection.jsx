import React, { useEffect, useRef, useState, useMemo } from "react";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import { useProductsQuery } from "@/network/product";
import { useRouter } from "next/router";

export default function CategorySection({ category }) {
  const { push } = useRouter();
  const containerRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Fire the query only when the section is within 400px of the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || triggered) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { rootMargin: "400px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  const { data, isLoading } = useProductsQuery(
    [category?.name],
    10,
    `category-${category?._id || category?.name}`,
    undefined,
    { enabled: triggered }
  );

  const products = useMemo(() => data?.body?.products || [], [data]);

  // Collapse section once we know it has no products
  useEffect(() => {
    if (triggered && !isLoading && products.length === 0) setIsEmpty(true);
  }, [triggered, isLoading, products.length]);

  if (isEmpty) return null;

  const handleViewAll = () =>
    push(`/shop?category=${encodeURIComponent(category?.name || "")}`);

  const content =
    !triggered || isLoading
      ? []
      : [
          ...products,
          {
            type: "VIEW_MORE",
            onClick: handleViewAll,
            title: "View all",
          },
        ];

  // Lightweight placeholder reserves vertical space before the section triggers
  if (!triggered) {
    return (
      <div ref={containerRef} className="category__section__placeholder">
        <div className="ph__title" />
        <div className="ph__row" />
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <ProductCarousel
        content={content}
        carouselTitle={category?.name}
        loading={isLoading}
        hideIfEmpty={false}
        onViewMore={handleViewAll}
      />
    </div>
  );
}
