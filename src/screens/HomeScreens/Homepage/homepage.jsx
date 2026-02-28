import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { HomepageWrapper } from "./homepage.styles";
import HeroSection from "./HeroSection/heroSection";
import ProductsGridBox from "./ProductsGridBox/productsGridBox";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import ProductGrid from "@/components/lib/ProductGrid/productGrid";
import { useProductCategoriesQuery, useProductsQuery } from "@/network/product";

/** ---------- Seeded RNG helpers ---------- */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(array, seedNumber) {
  const arr = Array.isArray(array) ? [...array] : [];
  const rand = mulberry32(seedNumber >>> 0);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hourSeed() {
  const d = new Date();
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours()}`;
  let seed = 0;
  for (let i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) >>> 0;
  return seed >>> 0;
}

/** ---------- Category normalization (merge similar) ---------- */
/**
 * Convert category names to a canonical key so we can dedupe:
 * - "Textiles/Fabrics" and "Textiles & Fabrics" become same
 * - trims spacing, case, slash/ampersand normalization
 */
function canonicalizeCategoryName(name) {
  if (!name || typeof name !== "string") return "";

  let n = name.trim().toLowerCase();

  // normalize separators
  n = n.replace(/\s*&\s*/g, " and ");
  n = n.replace(/\s*\/\s*/g, " and ");
  n = n.replace(/\s+/g, " ");

  // explicit synonym merges (add more as you notice duplicates)
  const SYNONYMS = {
    "textiles and fabrics": "textiles and fabrics",
    "fabric and textiles": "textiles and fabrics",
    "art and craft": "arts and crafts",
    "arts and craft": "arts and crafts",
    "jewellery": "jewelry",
  };

  return SYNONYMS[n] || n;
}

/**
 * Choose a nice display label for the canonical category
 * (so it looks consistent on UI even if backend had variants)
 */
function displayCategoryName(canonical) {
  const DISPLAY = {
    "textiles and fabrics": "Textiles & Fabrics",
    "arts and crafts": "Arts & Crafts",
    "jewelry": "Jewelry",
  };
  return DISPLAY[canonical] || canonical
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** ---------- View More card marker ---------- */
function makeViewMoreItem(categoryCanonical) {
  return { __type: "VIEW_MORE", category: categoryCanonical };
}

export default function Homepage() {
  const router = useRouter();
  const { data: productCategories, isLoading } = useProductCategoriesQuery();

  // changes on refresh
  const refreshSeed = useMemo(() => (Math.floor(Math.random() * 2 ** 31) >>> 0), []);
  // changes hourly AND on refresh
  const combinedSeed = useMemo(() => (hourSeed() ^ refreshSeed) >>> 0, [refreshSeed]);

  // Build canonical category list from API, dedupe similar categories, shuffle
  const categoryCanonicals = useMemo(() => {
    const cats = productCategories?.data || [];
    const rawNames = cats
      .map((c) => c?.name || c?.title || c)
      .filter((n) => typeof n === "string" && n.trim().length > 0);

    const EXCLUDE = new Set(["all", "uncategorized"]);

    const canonicals = rawNames
      .map((n) => canonicalizeCategoryName(n))
      .filter((c) => c && !EXCLUDE.has(c));

    // dedupe while keeping order
    const unique = [];
    const seen = new Set();
    for (const c of canonicals) {
      if (!seen.has(c)) {
        seen.add(c);
        unique.push(c);
      }
    }

    return seededShuffle(unique, combinedSeed);
  }, [productCategories?.data, combinedSeed]);

  // Fixed slots (we still call fixed number of hooks)
  const slot1 = categoryCanonicals[0];
  const slot2 = categoryCanonicals[1];
  const slot3 = categoryCanonicals[2];
  const slot4 = categoryCanonicals[3];

  // Queries (fixed count)
  const q1 = useProductsQuery(slot1 ? [displayCategoryName(slot1)] : [], 10, `home-slot-1-${slot1 || "empty"}`);
  const q2 = useProductsQuery(slot2 ? [displayCategoryName(slot2)] : [], 10, `home-slot-2-${slot2 || "empty"}`);
  const q3 = useProductsQuery(slot3 ? [displayCategoryName(slot3)] : [], 10, `home-slot-3-${slot3 || "empty"}`);
  const q4 = useProductsQuery(slot4 ? [displayCategoryName(slot4)] : [], 10, `home-slot-4-${slot4 || "empty"}`);

  // Shuffle products + append "View all" card
  const slot1Products = useMemo(() => {
    const list = q1?.data?.body?.products || [];
    const shuffled = seededShuffle(list, (combinedSeed + 101) >>> 0);
    return slot1 ? [...shuffled, makeViewMoreItem(slot1)] : shuffled;
  }, [q1?.data, combinedSeed, slot1]);

  const slot2Products = useMemo(() => {
    const list = q2?.data?.body?.products || [];
    const shuffled = seededShuffle(list, (combinedSeed + 202) >>> 0);
    return slot2 ? [...shuffled, makeViewMoreItem(slot2)] : shuffled;
  }, [q2?.data, combinedSeed, slot2]);

  const slot3Products = useMemo(() => {
    const list = q3?.data?.body?.products || [];
    const shuffled = seededShuffle(list, (combinedSeed + 303) >>> 0);
    return slot3 ? [...shuffled, makeViewMoreItem(slot3)] : shuffled;
  }, [q3?.data, combinedSeed, slot3]);

  const slot4Products = useMemo(() => {
    const list = q4?.data?.body?.products || [];
    const shuffled = seededShuffle(list, (combinedSeed + 404) >>> 0);
    return slot4 ? [...shuffled, makeViewMoreItem(slot4)] : shuffled;
  }, [q4?.data, combinedSeed, slot4]);

  // Skip empty sections automatically (don’t render if there are zero real products)
  const slot1RealCount = (q1?.data?.body?.products || []).length;
  const slot2RealCount = (q2?.data?.body?.products || []).length;
  const slot3RealCount = (q3?.data?.body?.products || []).length;
  const slot4RealCount = (q4?.data?.body?.products || []).length;

  // When user clicks "View all"
  const goToCategoryShop = (categoryCanonical) => {
    const label = displayCategoryName(categoryCanonical);
    router.push(`/shop?category=${encodeURIComponent(label)}`);
  };

  return (
    <HomepageWrapper>
      <HeroSection
        productCategories={productCategories?.data}
        loadingCategories={isLoading}
      />

      {slot1 && slot1RealCount > 0 ? (
        <ProductsGridBox
          content={slot1Products}
          sectionTitle={`Top ${displayCategoryName(slot1)} Deals`}
          loading={q1?.isLoading}
          onViewMore={() => goToCategoryShop(slot1)}   // <-- we’ll use this in Phase 1B
        />
      ) : null}

      {slot2 && slot2RealCount > 0 ? (
        <ProductCarousel
          content={slot2Products}
          carouselTitle={`${displayCategoryName(slot2)} Deals`}
          loading={q2?.isLoading}
          hideIfEmpty={true}
          onViewMore={() => goToCategoryShop(slot2)}   // <-- we’ll use this in Phase 1B
        />
      ) : null}

      {slot3 && slot3RealCount > 0 ? (
        <ProductCarousel
          content={slot3Products}
          carouselTitle={`${displayCategoryName(slot3)} Picks`}
          loading={q3?.isLoading}
          hideIfEmpty={true}
          onViewMore={() => goToCategoryShop(slot3)}   // <-- we’ll use this in Phase 1B
        />
      ) : null}

      {slot4 && slot4RealCount > 0 ? (
        <ProductGrid
          gridTitle={`${displayCategoryName(slot4)} Deals`}
          loading={q4?.isLoading}
          content={slot4Products}
          onViewMore={() => goToCategoryShop(slot4)}   // <-- we’ll use this in Phase 1B
        />
      ) : null}
    </HomepageWrapper>
  );
}