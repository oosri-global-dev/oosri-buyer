import Breadcrumb from "@/components/lib/Breadcrumb/breadcrumb";
import { ShopPageWrapper } from "./ShopScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Checkbox,
  Select,
  Tag,
  Spin,
  Alert,
  Modal,
  Button,
  Pagination,
  Slider,
} from "antd";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useProductsQuery, useProductCategoriesQuery } from "@/network/product";
import { FaFilter } from "react-icons/fa";

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

/** Price getter aligned with common data shapes (direct, alternates, variants min) */
function getEffectiveProductPrice(product) {
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

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE_USD]); // [min, max]
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelects, setOpenSelects] = useState({});
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(null);

  const itemsPerPage = 12;

  // stable shuffle per visit; changes on refresh
  useEffect(() => {
    setShuffleSeed(Date.now());
  }, []);

  const {
    data: productCategories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
  } = useProductCategoriesQuery();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useProductsQuery("", itemsPerPage, "products", itemOffset);

  const productsList = useMemo(() => products?.body?.products || [], [products]);
  const totalProducts = products?.body?.total || 0;

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

  // max at 7000 acts as "All prices" (Infinity) so items above 7000 don't disappear.
  const effectivePriceRange = useMemo(() => {
    const min = Number(priceRange?.[0] ?? 0);
    const maxRaw = Number(priceRange?.[1] ?? MAX_PRICE_USD);
    const max = maxRaw >= MAX_PRICE_USD ? Infinity : maxRaw;
    return [min, max];
  }, [priceRange]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = effectivePriceRange;

    return productsList.filter((product) => {
      const price = getEffectiveProductPrice(product);

      // If price can't be parsed, keep it visible (forgiving UX).
      if (Number.isFinite(price)) {
        if (price < minPrice) return false;
        if (price > maxPrice) return false;
      }

      if (selectedCategories.length > 0) {
        const pCat = getCategoryName(product);
        if (!selectedCategories.includes(pCat)) return false;
      }

      if (allSelectedSubCategories.length > 0) {
        const pSub = getSubCategoryName(product);
        if (!allSelectedSubCategories.includes(pSub)) return false;
      }

      return true;
    });
  }, [
    productsList,
    effectivePriceRange,
    selectedCategories,
    allSelectedSubCategories,
  ]);

  const randomizedProducts = useMemo(() => {
    if (!shuffleSeed) return filteredProducts;
    return seededShuffle(filteredProducts, shuffleSeed);
  }, [filteredProducts, shuffleSeed]);

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
    setPriceRange([0, MAX_PRICE_USD]);
    setOpenSelects({});
  }, []);

  const FilterContent = () => (
    <div className="category__filters">
      {isLoadingCategories ? (
        <div className="loader_wrapper">
          <Spin />
        </div>
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
                Price: ${Number(priceRange[0]).toLocaleString()} - $
                {Number(priceRange[1]).toLocaleString()}
                {Number(priceRange[1]) >= MAX_PRICE_USD ? " (All prices)" : ""}
              </label>

              <Slider
                range
                min={0}
                max={MAX_PRICE_USD}
                step={1}
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
                tooltip={{
                  formatter: (v) => `$${Number(v).toLocaleString()}`,
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
  );

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

            <FilterContent />
          </aside>

          <FlexibleDiv width="100%" flexDir="column">
            <FlexibleDiv
              width="100%"
              justifyContent={
                isLoadingProducts || isErrorProducts ? "center" : "flex-start"
              }
              alignItems={
                isLoadingProducts || isErrorProducts ? "center" : "flex-start"
              }
              className={
                !isLoadingProducts && !isErrorProducts ? "products__grid" : ""
              }
              style={{
                flex: 1,
                display: isLoadingProducts || isErrorProducts ? "block" : "",
              }}
            >
              {isLoadingProducts ? (
                <div className="loader_wrapper">
                  <Spin style={{ color: "red" }} size="large" />
                </div>
              ) : isErrorProducts ? (
                <Alert
                  message="Error"
                  description="Failed to fetch products. Please try again later."
                  type="error"
                  showIcon
                />
              ) : (
                <>
                  {randomizedProducts.map((p, idx) => (
                    <ProductCard card={p} key={p?.id || p?._id || idx} />
                  ))}

                  {!randomizedProducts.length && (
                    <Alert
                      message="No products match your filters"
                      description="Try widening the price range or clearing filters."
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
          <FilterContent />
        </Modal>
      </ShopPageWrapper>
    </>
  );
}