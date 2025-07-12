import Breadcrumb from "../../components/lib/Breadcrumb/breadcrumb";
import { ShopPageWrapper } from "./ShopScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useMemo, useState } from "react";
import { Checkbox, Select, Tag } from "antd";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useProductsQuery, useProductCategoriesQuery } from "@/network/product";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [sliderPrice, setSliderPrice] = useState(500000);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: productCategories,
    isLoading,
    isSuccess,
  } = useProductCategoriesQuery();

  const { data: products, isLoading: isLoadingProducts } = useProductsQuery(
    "",
    12,
    "products"
  );

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
            <FlexibleDiv
              width="100%"
              className="category__filters"
              justifyContent="flex-start"
              alignItems="flex-start"
              flexDir="column"
              gap="15px"
            >
              {isSuccess && (
                <>
                  <Checkbox.Group
                    className="custom__checkbox__group"
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    value={selectedCategories}
                  />

                  <div className="price__filter">
                    <label htmlFor="price-range">
                      Price: ₦1,000 - ₦{Number(sliderPrice).toLocaleString()}
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
              )}
            </FlexibleDiv>
          </FlexibleDiv>
          {/* The page content */}
          <FlexibleDiv
            width="100%"
            justifyContent="space-between"
            className="products__grid"
          >
            {isLoadingProducts ? (
              <>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductCard key={idx} isLoading={true} />
                ))}
              </>
            ) : (
              <>
                {filteredProducts.map((sgn, idx) => (
                  <ProductCard card={sgn} key={idx} />
                ))}
              </>
            )}
          </FlexibleDiv>
        </FlexibleDiv>
      </ShopPageWrapper>
    </>
  );
}
