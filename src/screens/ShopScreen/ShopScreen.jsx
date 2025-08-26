import Breadcrumb from "../../components/lib/Breadcrumb/breadcrumb";
import { ShopPageWrapper } from "./ShopScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useMemo, useState } from "react";
import { Checkbox, Select, Tag, Spin, Alert, Modal, Button } from "antd";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useProductsQuery, useProductCategoriesQuery } from "@/network/product";
import { FaFilter } from "react-icons/fa";
import ReactPaginate from "react-paginate";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [sliderPrice, setSliderPrice] = useState(9999999);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelects, setOpenSelects] = useState({});
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [itemOffset, setItemOffset] = useState(0); // Keep itemOffset for skip calculation
  const itemsPerPage = 12; // This should match the limit passed to useProductsQuery
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
  } = useProductsQuery("", itemsPerPage, "products", itemOffset); // Pass itemOffset as skip

  const formatCategory = (cat = []) => {
    return cat.map((ct) => ({ label: ct.name, value: ct.name }));
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    const newSelectedSubCategories = { ...selectedSubCategories };
    Object.keys(newSelectedSubCategories).forEach((category) => {
      if (!checkedValues.includes(category)) {
        delete newSelectedSubCategories[category];
      }
    });
    setSelectedSubCategories(newSelectedSubCategories);
  };

  const handleSubCategoryChange = (categoryName, values) => {
    setSelectedSubCategories((prev) => ({
      ...prev,
      [categoryName]: values,
    }));
  };

  const handleDropdownVisibleChange = (open, categoryName) => {
    setOpenSelects((prev) => ({ ...prev, [categoryName]: open }));
  };

  const handleRemoveSubCategory = (removedTag) => {
    const newSelectedSubCategories = { ...selectedSubCategories };
    for (const category in newSelectedSubCategories) {
      const index = newSelectedSubCategories[category].indexOf(removedTag);
      if (index > -1) {
        newSelectedSubCategories[category].splice(index, 1);
        if (newSelectedSubCategories[category].length === 0) {
          delete newSelectedSubCategories[category];
        }
        break;
      }
    }
    setSelectedSubCategories(newSelectedSubCategories);
  };

  const allSelectedSubCategories = useMemo(() => {
    return Object.values(selectedSubCategories).flat();
  }, [selectedSubCategories]);

  const categoryOptions = useMemo(() => {
    return productCategories?.data
      ? formatCategory(productCategories.data)
      : [];
  }, [productCategories]);

  const filteredProducts = useMemo(() => {
    if (!products?.body?.products) return [];
    return products.body.products.filter((product) => {
      const price = parseFloat(product?.productPrice);
      return price <= sliderPrice;
    });
  }, [products, sliderPrice]);

  const pageCount = products?.body?.totalPages || 0;

  const handlePageClick = (event) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1); // Update currentPage for forcePage
  };

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterModalCancel = () => {
    setIsFilterModalVisible(false);
  };

  const FilterContent = () => (
    <FlexibleDiv
      width="100%"
      className="category__filters"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDir="column"
      gap="15px"
    >
      {isLoadingCategories ? (
        <div className="loader_wrapper">
          <Spin />
        </div>
      ) : isErrorCategories ? (
        <Alert message="Error loading categories" type="error" />
      ) : (
        isSuccessCategories && (
          <>
            <Checkbox.Group
              className="custom__checkbox__group"
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={selectedCategories}
            />

            <div className="price__filter">
              <label htmlFor="price-range">
                Price: ₦100 - ₦{Number(sliderPrice).toLocaleString()}
              </label>
              <input
                type="range"
                id="price-range"
                name="price-range"
                className="price__range"
                min="1000"
                max="500000"
                value={sliderPrice}
                onChange={({ target }) => setSliderPrice(target.value)}
              />
              <small>
                price filters only the currently viewed products by their prices
              </small>
            </div>

            {selectedCategories.map((categoryName) => {
              const category = productCategories?.data.find(
                (cat) => cat.name === categoryName
              );
              if (
                !category ||
                !category.subcategories ||
                category.subcategories.length === 0
              )
                return null;

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

            {allSelectedSubCategories.length > 0 && (
              <div className="selected__tags">
                <p>Selected Filters:</p>
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
    </FlexibleDiv>
  );

  return (
    <>
      <Breadcrumb numOfProducts={products?.body?.products?.length} />
      <ShopPageWrapper>
        <hr />

        <FlexibleDiv
          className="products__section"
          alignItems="flex-start"
          gap="22px"
          flexWrap="nowrap"
        >
          <FlexibleDiv
            className="filter__box"
            flexDir="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <p>CATEGORY</p>
            <FilterContent />
          </FlexibleDiv>

          {/* The page content */}
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
                  <Spin style={{ color: "red" }} size="large" color="red" />
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
                  {filteredProducts.map((sgn, idx) => (
                    <ProductCard card={sgn} key={idx} />
                  ))}
                </>
              )}
            </FlexibleDiv>
            {pageCount > 1 && (
              <FlexibleDiv className="pagination__wrapper">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  containerClassName="react__custom__pagination"
                  activeClassName="active"
                  pageLinkClassName="page-num"
                  previousLinkClassName="page-num"
                  nextLinkClassName="page-num"
                  forcePage={currentPage - 1}
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
          visible={isFilterModalVisible}
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
