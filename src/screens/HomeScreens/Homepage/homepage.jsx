import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HomepageWrapper } from "./homepage.styles";
import HeroSection from "./HeroSection/heroSection";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import CategorySection from "./CategorySection/categorySection";
import { useProductCategoriesQuery, useProductsQuery } from "@/network/product";

// ── Category name normalization ──────────────────────────────────────────────
function canonicalizeCategoryName(name) {
  if (!name || typeof name !== "string") return "";
  let n = name.trim().toLowerCase();
  n = n.replace(/\s*&\s*/g, " and ");
  n = n.replace(/\s*\/\s*/g, " and ");
  n = n.replace(/\s+/g, " ");
  const SYNONYMS = {
    "fabric and textiles": "textiles and fabrics",
    "art and craft": "arts and crafts",
    "arts and craft": "arts and crafts",
    "jewellery": "jewelry",
  };
  return SYNONYMS[n] || n;
}

// ── Trust strip ──────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    subtitle: "Nigeria & international shipping",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    subtitle: "Paystack · Stripe · all major cards",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    subtitle: "Hassle-free return policy",
  },
  {
    icon: "🌍",
    title: "Authentic African",
    subtitle: "Curated crafts & culture",
  },
];

function TrustStrip() {
  return (
    <div className="trust__strip">
      {TRUST_ITEMS.map((item) => (
        <div key={item.title} className="trust__item">
          <span className="trust__icon">{item.icon}</span>
          <div className="trust__text">
            <p className="trust__title">{item.title}</p>
            <p className="trust__subtitle">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Featured Products — immediately loaded, cross-category ───────────────────
function FeaturedProducts({ onViewAll }) {
  const { data, isLoading } = useProductsQuery([], 12, "home-featured");
  const products = useMemo(() => data?.body?.products || [], [data]);

  if (!isLoading && products.length === 0) return null;

  const content = isLoading
    ? []
    : [...products, { type: "VIEW_MORE", onClick: onViewAll, title: "View all" }];

  return (
    <ProductCarousel
      content={content}
      carouselTitle="Featured Products"
      loading={isLoading}
      hideIfEmpty={false}
      onViewMore={onViewAll}
    />
  );
}

// ── Homepage ─────────────────────────────────────────────────────────────────
export default function Homepage() {
  const router = useRouter();
  const { data: productCategories, isLoading: isLoadingCategories } =
    useProductCategoriesQuery();

  // Deduplicate & normalize categories — no shuffle, consistent order
  const categories = useMemo(() => {
    const cats = productCategories?.data || [];
    const EXCLUDE = new Set(["all", "uncategorized"]);
    const seen = new Set();
    return cats.filter((c) => {
      const raw = c?.name || c?.title || "";
      const canonical = canonicalizeCategoryName(raw);
      if (!canonical || EXCLUDE.has(canonical)) return false;
      if (seen.has(canonical)) return false;
      seen.add(canonical);
      return true;
    });
  }, [productCategories?.data]);

  return (
    <HomepageWrapper>
      {/* ── Hero — slider + category icons — DO NOT CHANGE ── */}
      <HeroSection
        productCategories={productCategories?.data}
        loadingCategories={isLoadingCategories}
      />

      {/* ── Body content ── */}
      <div className="home__body">

        {/* 1. Featured Products — immediate, cross-category */}
        <div className="home__section">
          <FeaturedProducts onViewAll={() => router.push("/shop")} />
        </div>

        {/* 2. Trust signals */}
        <TrustStrip />

        {/* 3. All category rows — each lazy-loads on scroll */}
        {categories.map((cat) => (
          <div key={cat._id || cat.name} className="home__section">
            <CategorySection category={cat} />
          </div>
        ))}

        {/* 4. Bottom CTA */}
        <div className="explore__cta">
          <div className="explore__cta__inner">
            <p className="explore__cta__title">
              Discover thousands of authentic African products
            </p>
            <p className="explore__cta__sub">
              From handcrafted jewelry to traditional textiles — find it all on Oosri
            </p>
            <Link href="/shop" className="explore__cta__btn">
              Explore All Products →
            </Link>
          </div>
        </div>

      </div>
    </HomepageWrapper>
  );
}
