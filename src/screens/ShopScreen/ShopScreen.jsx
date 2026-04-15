import Breadcrumb from "@/components/lib/Breadcrumb/breadcrumb";
import { ShopPageWrapper } from "./ShopScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useProductSearch } from "@/data-helpers/useProductSearch";
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
const SEARCH_PAGE_SIZE = 12;
const SEARCH_PAGE_COUNT = 5; // 5 pages × 12 = up to 60 products for search

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

function parseUsdPrice(value) {
  if (value === null || value === undefined) return NaN;

  if (typeof value === "number") {
    if (
      Number.isInteger(value) &&
      value > MAX_PRICE_USD &&
      value <= MAX_PRICE_USD * 100
    ) {
      return value / 100;
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
  const router = useRouter();
  const searchQuery =
    typeof router.query.q === "string" ? router.query.q.trim() : "";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE_USD]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelects, setOpenSelects] = useState({});
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(null);

  const itemsPerPage = 12;

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

  // Multiple queries for search pool
  const { data: searchPage1 } = useProductsQuery("", SEARCH_PAGE_SIZE, "products", 0);
  const { data: searchPage2 } = useProductsQuery("", SEARCH_PAGE_SIZE, "products", 12);
  const { data: searchPage3 } = useProductsQuery("", SEARCH_PAGE_SIZE, "products", 24);
  const { data: searchPage4 } = useProductsQuery("", SEARCH_PAGE_SIZE, "products", 36);
  const { data: searchPage5 } = useProductsQuery("", SEARCH_PAGE_SIZE, "products", 48);

  const productsList = useMemo(() => products?.body?.products || [], [products]);
  const totalProducts = products?.body?.total || 0;

  const searchProductsList = useMemo(() => {
    const combined = [
      ...(searchPage1?.body?.products || []),
      ...(searchPage2?.body?.products || []),
      ...(searchPage3?.body?.products || []),
      ...(searchPage4?.body?.products || []),
      ...(searchPage5?.body?.products || []),
    ];

    const uniqueMap = new Map();

    combined.forEach((product) => {
      const id = product?._id || product?.id;
      if (id && !uniqueMap.has(id)) {
        uniqueMap.set(id, product);
      }
    });

    return Array.from(uniqueMap.values());
  }, [searchPage1, searchPage2, searchPage3, searchPage4, searchPage5]);

  useEffect(() => {
    console.log("productsList:", productsList.length);
    console.log("searchProductsList:", searchProductsList.length);
    console.log("sample searchProductsList:", searchProductsList.slice(0, 3));
  }, [productsList, searchProductsList]);

  const normalizedProducts = useMemo(() => {
    return searchProductsList.map((product) => ({
      id: product?._id || product?.id,
      name: product?.name || product?.productName || "",
      description: product?.description || product?.shortDescription || "",
      price: Number(product?.productPrice || product?.price || 0),
      category: getCategoryName(product),
      subcategory: getSubCategoryName(product),
      brand: product?.brand?.name || product?.brand || "",
      tags: Array.isArray(product?.tags) ? product.tags : [],
      stock: Number(product?.stock || product?.quantity || 0),
      image: product?.image || product?.thumbnail || "",
      sku: product?.sku || "",
    }));
  }, [searchProductsList]);

  const { results: searchResults, updateQuery } = useProductSearch(
    normalizedProducts
  );

  useEffect(() => {
    updateQuery(searchQuery || "");
    setCurrentPage(1);
  }, [searchQuery, updateQuery]);

  const formatCategory = useCallback((cat = []) => {
    return cat.map((ct) => ({ label: ct.name, value: ct.name }));
  }, []);

  const categoryOptions = useMemo(() => {
    return productCategories?.data ? formatCategory(productCategories.data) : [];
  }, [productCategories, formatCategory]);

  const handleCategoryChange = useCallback((checkedValues) => {
    setSelectedCategories(checkedValues);

    setSelectedSubCategories((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((category) => {
        if (!checkedValues.includes(category)) delete next[category];
      });
      return next;
    });

    setCurrentPage(1);
    setItemOffset(0);
  }, []);

  const handleSubCategoryChange = useCallback((categoryName, values) => {
    setSelectedSubCategories((prev) => ({
      ...prev,
      [categoryName]: values,
    }));
    setCurrentPage(1);
    setItemOffset(0);
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

    setCurrentPage(1);
    setItemOffset(0);
  }, []);

  const allSelectedSubCategories = useMemo(() => {
    return Object.values(selectedSubCategories).flat();
  }, [selectedSubCategories]);

  const effectivePriceRange = useMemo(() => {
    const min = Number(priceRange?.[0] ?? 0);
    const maxRaw = Number(priceRange?.[1] ?? MAX_PRICE_USD);
    const max = maxRaw >= MAX_PRICE_USD ? Infinity : maxRaw;
    return [min, max];
  }, [priceRange]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = effectivePriceRange;

    let baseProducts = productsList;

    if (searchQuery) {
      const matchedIds = new Set(searchResults.map((p) => p.id));
      baseProducts = searchProductsList.filter((product) =>
        matchedIds.has(product?._id || product?.id)
      );
    }

    return baseProducts.filter((product) => {
      const price = getEffectiveProductPrice(product);

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
    searchProductsList,
    searchQuery,
    searchResults,
    effectivePriceRange,
    selectedCategories,
    allSelectedSubCategories,
  ]);

  const paginatedFilteredProducts = useMemo(() => {
    if (searchQuery) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.slice(start, end);
    }

    return filteredProducts;
  }, [filteredProducts, searchQuery, currentPage, itemsPerPage]);

  const randomizedProducts = useMemo(() => {
    if (!shuffleSeed) return paginatedFilteredProducts;
    return seededShuffle(paginatedFilteredProducts, shuffleSeed);
  }, [paginatedFilteredProducts, shuffleSeed]);

  const handlePageChange = useCallback(
    (page, pageSize) => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      if (searchQuery) {
        setCurrentPage(page);
        return;
      }

      const newOffset = (page - 1) * pageSize;
      setItemOffset(newOffset);
      setCurrentPage(page);
    },
    [searchQuery]
  );

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
    setCurrentPage(1);
    setItemOffset(0);
  }, []);

  const totalForPagination = searchQuery ? filteredProducts.length : totalProducts;

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
              <button
                className="filter__clear"
                onClick={clearFilters}
                type="button"
              >
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
                onChange={(val) => {
                  setPriceRange(val);
                  setCurrentPage(1);
                  setItemOffset(0);
                }}
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
      <Breadcrumb numOfProducts={filteredProducts.length} />

      <ShopPageWrapper>
        <hr />

        <FlexibleDiv
          className="products__section"
          alignItems="flex-start"
          gap="22px"
          flexWrap="nowrap"
        >
          <aside className="filter__box">
            <div className="filter__header">
              <p className="filter__title">CATEGORY</p>
            </div>

            <FilterContent />
          </aside>

          <FlexibleDiv width="100%" flexDir="column">
            {searchQuery ? (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  Search results for: &quot;{searchQuery}&quot;
                </p>
              </div>
            ) : null}

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
                      message={
                        searchQuery
                          ? `No products match "${searchQuery}"`
                          : "No products match your filters"
                      }
                      description={
                        searchQuery
                          ? "Try a different search term or clear some filters."
                          : "Try widening the price range or clearing filters."
                      }
                      type="info"
                      showIcon
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )}
            </FlexibleDiv>

            {totalForPagination > 0 && (
              <FlexibleDiv className="pagination__wrapper">
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={totalForPagination}
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