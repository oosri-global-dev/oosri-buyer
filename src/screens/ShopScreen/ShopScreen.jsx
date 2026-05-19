import Breadcrumb from "@/components/lib/Breadcrumb/breadcrumb";
import { ShopPageWrapper } from "./ShopScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Checkbox,
  Select,
  Tag,
  Alert,
  Modal,
  Button,
  Pagination,
  Slider,
} from "antd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";
import { useProductsQuery, useProductCategoriesQuery } from "@/network/product";
import { useSearchQuery } from "@/network/search";
import { FaFilter } from "react-icons/fa";
import { useCurrency } from "@/context";

const MAX_PRICE_USD = 7000;

/** Deterministic seeded shuffle (stable during a visit, changes on refresh) */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  const a = [...arr];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Robust USD parser:
 * Handles numbers and strings like "$1,200.50", "1200", "1,200", "USD 1200".
 * Includes a safe-ish cents heuristic within the 0..7000 range.
 */
function parseUsdPrice(value) {
  if (value === null || value === undefined) return NaN;

  if (typeof value === "number") {
    if (
      Number.isInteger(value) &&
      value > MAX_PRICE_USD &&
      value <= MAX_PRICE_USD * 100
    ) {
      return value / 100; // cents → dollars
    }
    return value;
  }

  const s = String(value).trim();
  if (!s) return NaN;

  const cleaned = s
    .replace(/,/g, "")
    .replace(/\$/g, "")
    .replace(/usd/gi, "")
    .replace(/[^\d.]/g, "");

  if (!cleaned) return NaN;

  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n)) return NaN;

  if (Number.isInteger(n) && n > MAX_PRICE_USD && n <= MAX_PRICE_USD * 100) {
    return n / 100;
  }

  return n;
}

/** Price getter — prefers pre-converted USD fields returned by the API */
function getEffectiveProductPrice(product) {
  // Prefer explicit USD fields set by the backend FX conversion
  const usd =
    product?.regularPriceUSD ??
    product?.discountPriceUSD ??
    product?.salesPriceUSD;
  if (Number.isFinite(usd) && usd > 0) return usd;

  // Fall back to raw price fields parsed as USD
  const direct = parseUsdPrice(product?.productPrice);
  if (Number.isFinite(direct)) return direct;

  const alt =
    parseUsdPrice(product?.price) ||
    parseUsdPrice(product?.amount) ||
    parseUsdPrice(product?.salePrice) ||
    parseUsdPrice(product?.unitPrice);

  if (Number.isFinite(alt)) return alt;

  const variants = product?.variants || product?.options || product?.skus;
  if (Array.isArray(variants) && variants.length > 0) {
    const prices = variants
      .map((v) => parseUsdPrice(v?.price ?? v?.productPrice ?? v?.amount))
      .filter(Number.isFinite);
    if (prices.length) return Math.min(...prices);
  }

  return NaN;
}

/** Try to read category/subcategory names from different possible product shapes */
function getCategoryName(product) {
  return (
    product?.category?.name ||
    product?.categoryName ||
    product?.category ||
    product?.productCategory ||
    ""
  );
}
function getSubCategoryName(product) {
  return (
    product?.subcategory?.name ||
    product?.subCategory?.name ||
    product?.subCategoryName ||
    product?.subcategoryName ||
    product?.subCategory ||
    product?.subcategory ||
    ""
  );
}

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

export default function ShopPage() {
  const router = useRouter();
  const { currency, fxRates, currencyData } = useCurrency();
  const currencyRate = fxRates[currency] ?? currencyData?.rate ?? 1;
  const currencySymbol = currencyData?.symbol ?? "$";
  const maxPriceLocal = Math.round(MAX_PRICE_USD * currencyRate);
  const priceStep = Math.max(1, Math.round(maxPriceLocal / 700));

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE_USD]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelects, setOpenSelects] = useState({});
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(null);
  const [urlParamsApplied, setUrlParamsApplied] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    setShuffleSeed(Date.now());
  }, []);

  // Reset price range to full span whenever the user switches currency
  useEffect(() => {
    setPriceRange([0, maxPriceLocal]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // Read search query from URL (?q=) — drives Algolia search mode
  const searchTerm = useMemo(() => {
    if (!router.isReady) return "";
    const q = router.query.q;
    return typeof q === "string" ? q.trim() : "";
  }, [router.isReady, router.query.q]);

  const isSearchMode = searchTerm.length >= 2;

  // Sync category from URL — runs whenever ?category= changes
  useEffect(() => {
    if (!router.isReady) return;
    const { category } = router.query;
    if (category && !isSearchMode) {
      const decoded = decodeURIComponent(String(category));
      setSelectedCategories([decoded]);
    } else if (!category && !isSearchMode && !urlParamsApplied) {
      setSelectedCategories([]);
    }
    setUrlParamsApplied(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.category]);

  const {
    data: productCategories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
  } = useProductCategoriesQuery();

  // Reset to page 1 whenever category selection changes
  useEffect(() => {
    setItemOffset(0);
    setCurrentPage(1);
  }, [selectedCategories]);

  // Algolia search (only when ?q= is present)
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchQuery(isSearchMode ? searchTerm : "");

  // Regular product fetch (disabled when in search mode)
  const apiCategory = selectedCategories.length > 0 ? selectedCategories : "";
  const productQueryKey = `shop-${selectedCategories.sort().join(",")}`;

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useProductsQuery(apiCategory, itemsPerPage, productQueryKey, itemOffset, {
    enabled: !isSearchMode,
  });

  const searchResults = useMemo(() => searchData?.body?.products || [], [searchData]);
  const productsList = useMemo(
    () => (isSearchMode ? searchResults : products?.body?.products || []),
    [isSearchMode, searchResults, products]
  );
  const totalProducts = isSearchMode ? searchResults.length : (products?.body?.total || 0);
  const isLoadingProductsAny = isSearchMode ? isLoadingSearch : isLoadingProducts;

  const formatCategory = useCallback((cat = []) => {
    return cat.map((ct) => ({ label: ct.name, value: ct.name }));
  }, []);

  const categoryOptions = useMemo(() => {
    return productCategories?.data ? formatCategory(productCategories.data) : [];
  }, [productCategories, formatCategory]);

  const handleCategoryChange = useCallback((checkedValues) => {
    setSelectedCategories(checkedValues);

    // remove subcategory selections for removed categories
    setSelectedSubCategories((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((category) => {
        if (!checkedValues.includes(category)) delete next[category];
      });
      return next;
    });
  }, []);

  const handleSubCategoryChange = useCallback((categoryName, values) => {
    setSelectedSubCategories((prev) => ({
      ...prev,
      [categoryName]: values,
    }));
  }, []);

  const handleDropdownVisibleChange = useCallback((open, categoryName) => {
    setOpenSelects((prev) => ({ ...prev, [categoryName]: open }));
  }, []);

  const handleRemoveSubCategory = useCallback((removedTag) => {
    setSelectedSubCategories((prev) => {
      const next = { ...prev };
      for (const category in next) {
        const idx = next[category].indexOf(removedTag);
        if (idx > -1) {
          const updated = [...next[category]];
          updated.splice(idx, 1);
          if (updated.length === 0) delete next[category];
          else next[category] = updated;
          break;
        }
      }
      return next;
    });
  }, []);

  const allSelectedSubCategories = useMemo(() => {
    return Object.values(selectedSubCategories).flat();
  }, [selectedSubCategories]);

  const effectivePriceRange = useMemo(() => {
    const min = Number(priceRange?.[0] ?? 0);
    const max = Number(priceRange?.[1] ?? MAX_PRICE_USD);
    return [min, max];
  }, [priceRange]);

  // Categories are filtered server-side — client-side pass only does price + subcategory
  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = effectivePriceRange;

    return productsList.filter((product) => {
      const priceUSD = getEffectiveProductPrice(product);
      if (Number.isFinite(priceUSD)) {
        const price = Math.round(priceUSD * currencyRate);
        if (price < minPrice || price > maxPrice) return false;
      }

      if (allSelectedSubCategories.length > 0) {
        const pSub = getSubCategoryName(product);
        if (!allSelectedSubCategories.includes(pSub)) return false;
      }

      return true;
    });
  }, [productsList, effectivePriceRange, allSelectedSubCategories]);

  const randomizedProducts = useMemo(() => {
    if (!shuffleSeed) return filteredProducts;
    return seededShuffle(filteredProducts, shuffleSeed);
  }, [filteredProducts, shuffleSeed]);

  const sortedProducts = useMemo(() => {
    const list = [...randomizedProducts];
    if (sortBy === "price_asc") {
      list.sort((a, b) => (getEffectiveProductPrice(a) || 0) - (getEffectiveProductPrice(b) || 0));
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => (getEffectiveProductPrice(b) || 0) - (getEffectiveProductPrice(a) || 0));
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0));
    }
    return list;
  }, [randomizedProducts, sortBy]);

  const handlePageChange = useCallback((page, pageSize) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const newOffset = (page - 1) * pageSize;
    setItemOffset(newOffset);
    setCurrentPage(page);
  }, []);

  const showFilterModal = useCallback(() => setIsFilterModalVisible(true), []);
  const handleFilterModalCancel = useCallback(
    () => setIsFilterModalVisible(false),
    []
  );

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedSubCategories({});
    setPriceRange([0, maxPriceLocal]);
    setOpenSelects({});
  }, [maxPriceLocal]);

  const filterContentNode = useMemo(() => (
    <div className="category__filters">
      {isLoadingCategories ? (
        <SkeletonTheme baseColor="rgba(148,148,148,0.1)" highlightColor="rgba(202,202,202,0.4)">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "8px 0" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} style={{ width: `${60 + (i % 3) * 15}%`, height: 16, borderRadius: 4 }} />
            ))}
          </div>
        </SkeletonTheme>
      ) : isErrorCategories ? (
        <Alert message="Error loading categories" type="error" />
      ) : (
        isSuccessCategories && (
          <>
            <div className="filter__meta">
              <button className="filter__clear" onClick={clearFilters} type="button">
                Clear
              </button>
            </div>

            <Checkbox.Group
              className="custom__checkbox__group"
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={selectedCategories}
            />

            <div className="price__filter">
              <label>
                Price: {currencySymbol}{Number(priceRange[0]).toLocaleString()} – {currencySymbol}{Number(priceRange[1]).toLocaleString()}
              </label>

              <Slider
                range
                min={0}
                max={maxPriceLocal}
                step={priceStep}
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
                tooltip={{
                  formatter: (v) => `${currencySymbol}${Number(v).toLocaleString()}`,
                }}
              />

              <p className="price__hint">
                price filters only the currently viewed products by their prices
              </p>
            </div>

            {selectedCategories.map((categoryName) => {
              const category = productCategories?.data?.find(
                (cat) => cat.name === categoryName
              );
              if (!category?.subcategories?.length) return null;

              return (
                <div key={categoryName} className="subcategory__select">
                  <label>{categoryName}</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder={`Select from ${categoryName}`}
                    onChange={(values) =>
                      handleSubCategoryChange(categoryName, values)
                    }
                    onSelect={() =>
                      handleDropdownVisibleChange(false, categoryName)
                    }
                    onDeselect={() =>
                      handleDropdownVisibleChange(false, categoryName)
                    }
                    onDropdownVisibleChange={(open) =>
                      handleDropdownVisibleChange(open, categoryName)
                    }
                    open={openSelects[categoryName]}
                    value={selectedSubCategories[categoryName] || []}
                    options={formatCategory(category.subcategories)}
                  />
                </div>
              );
            })}

            {(selectedCategories.length > 0 ||
              allSelectedSubCategories.length > 0) && (
              <div className="selected__tags">
                <p style={{ marginBottom: 6 }}>Selected Filters:</p>

                {selectedCategories.map((cat) => (
                  <Tag
                    key={cat}
                    closable
                    onClose={(e) => {
                      e.preventDefault();
                      handleCategoryChange(
                        selectedCategories.filter((x) => x !== cat)
                      );
                    }}
                  >
                    {cat}
                  </Tag>
                ))}

                {allSelectedSubCategories.map((tag) => (
                  <Tag
                    closable
                    key={tag}
                    onClose={() => handleRemoveSubCategory(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </>
        )
      )}
    </div>
  ), [
    isLoadingCategories,
    isErrorCategories,
    isSuccessCategories,
    clearFilters,
    categoryOptions,
    handleCategoryChange,
    selectedCategories,
    priceRange,
    productCategories,
    handleSubCategoryChange,
    handleDropdownVisibleChange,
    openSelects,
    formatCategory,
    allSelectedSubCategories,
    handleRemoveSubCategory,
    selectedSubCategories,
    currency,
    currencySymbol,
    maxPriceLocal,
    priceStep,
  ]);

  return (
    <>
      <Breadcrumb numOfProducts={productsList.length} />

      <ShopPageWrapper>
        <hr />

        <FlexibleDiv
          className="products__section"
          alignItems="flex-start"
          gap="22px"
          flexWrap="nowrap"
        >
          {/* ✅ Sidebar filter card like screenshot */}
          <aside className="filter__box">
            <div className="filter__header">
              <p className="filter__title">CATEGORY</p>
            </div>

            {filterContentNode}
          </aside>

          <FlexibleDiv width="100%" flexDir="column" gap="0">
            {/* ── Search mode banner ── */}
            {isSearchMode && (
              <div className="search__banner">
                <span>
                  {isLoadingProductsAny
                    ? `Searching for "${searchTerm}"…`
                    : `${totalProducts} result${totalProducts !== 1 ? "s" : ""} for "${searchTerm}"`}
                </span>
                <button
                  className="search__banner__clear"
                  onClick={() => router.push("/shop")}
                >
                  Clear search ×
                </button>
              </div>
            )}

            {/* ── Results bar ── */}
            {!isLoadingProductsAny && !isErrorProducts && !isErrorSearch && !isSearchMode && (
              <FlexibleDiv
                width="100%"
                justifyContent="space-between"
                alignItems="center"
                className="results__bar"
              >
                <p className="results__count">
                  {sortedProducts.length === totalProducts
                    ? `${totalProducts} products`
                    : `${sortedProducts.length} of ${totalProducts} products`}
                </p>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_OPTIONS}
                  size="small"
                  className="sort__select"
                  style={{ minWidth: 160 }}
                  bordered={false}
                />
              </FlexibleDiv>
            )}

            <FlexibleDiv
              width="100%"
              justifyContent="flex-start"
              alignItems="flex-start"
              className={!(isErrorProducts || isErrorSearch) ? "products__grid" : ""}
              style={{ flex: 1 }}
            >
              {isLoadingProductsAny ? (
                Array.from({ length: 12 }).map((_, idx) => <LoadingCard key={idx} />)
              ) : (isErrorProducts || isErrorSearch) ? (
                <Alert
                  message="Error"
                  description="Failed to fetch products. Please try again later."
                  type="error"
                  showIcon
                />
              ) : (
                <>
                  {sortedProducts.map((p, idx) => (
                    <ProductCard card={p} key={p?.id || p?._id || idx} />
                  ))}

                  {!sortedProducts.length && (
                    <Alert
                      message={isSearchMode ? `No results for "${searchTerm}"` : "No products match your filters"}
                      description={isSearchMode ? "Try a different search term." : "Try widening the price range or clearing filters."}
                      type="info"
                      showIcon
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )}
            </FlexibleDiv>

            {totalProducts > 0 && (
              <FlexibleDiv className="pagination__wrapper">
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={totalProducts}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  responsive
                  showQuickJumper
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                />
              </FlexibleDiv>
            )}
          </FlexibleDiv>
        </FlexibleDiv>

        <Button
          className="floating__filter__btn"
          type="primary"
          shape="circle"
          icon={<FaFilter size="20px" />}
          onClick={showFilterModal}
        />

        <Modal
          title="Filters"
          open={isFilterModalVisible}
          onCancel={handleFilterModalCancel}
          footer={null}
          width={300}
        >
          {filterContentNode}
        </Modal>
      </ShopPageWrapper>
    </>
  );
}
