import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Breadcrumb from "../../components/lib/Breadcrumb/breadcrumb";
import { ShopPageWrapper } from "./ShopScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Filter from "@/assets/images/filter.svg";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { Checkbox } from "antd";
import Button from "@/components/lib/Button";
import { Select } from "antd";
import useOutsideAlerter from "@/data-helpers/hooks";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useRef } from "react";
import { nairaFormatter } from "@/data-helpers/hooks";

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState(null);
  const popupRef = useRef(null);
  const [sliderPrice, setSliderPrice] = useState(50000);
  const [subCategories, setSubCategories] = useState([
    {
      name: "Colour",
      options: ["Blue", "Red", "Gold", "Black"],
    },
    {
      name: "Brand",
      options: ["Samsung", "iPhone 13", "Fly", "Bontel"],
    },
  ]);
  const options = [
    { label: "Mobile Phones", value: "Mobile Phones" },
    { label: "Wristwatch", value: "Wristwatch" },
    { label: "Tablet", value: "Tablet" },
    { label: "Computer Accessories", value: "Computer Accessories" },
  ];
  const phoneOptions = [
    { label: "128 GB", value: "128 GB" },
    { label: "64 GB", value: "64 GB" },
    { label: "32 GB", value: "32GB" },
  ];

  const ratingOptions = [
    { label: "Rating", value: "Rating" },
    { label: "Most Purchased", value: "Most Purchased" },
    { label: "High to Low Priced", value: "High to Low Priced" },
    { label: "Low to High Price", value: "Low to High Price" },
    { label: "All", value: "All" },
  ];

  function onChangeCategory(checkedValues) {
    //set the category to be shown
    console.log("checked = ", checkedValues);

    //update the category state
    setCategories(checkedValues);
  }

  function onChangeSubCategory(checkedValues) {
    //set the category to be shown
    console.log("checked = ", checkedValues);

    //update the category state
  }

  const categoryBox = (categoryName) => {
    return (
      <FlexibleDiv
        className="category__box"
        justifyContent="space-between"
        alignItems="center"
      >
        <p>{categoryName}</p>
        <ArrowDown color="#BDBDBD" />
      </FlexibleDiv>
    );
  };

  //This hook helps hide the filter if an outside click is noticed
  useOutsideAlerter(popupRef, showFilter, setShowFilter);

  return (
    <GeneralLayout>
      <Breadcrumb numOfProducts={19233} />
      <ShopPageWrapper>
        <hr />
        <FlexibleDiv
          justifyContent="space-between"
          width="100%"
          flexWrap="nowrap"
          margin="15px 0 0 0"
        >
          <FlexibleDiv
            justifyContent="flex-start"
            gap="15px"
            flexWrap="nowrap"
            width="fit-content"
          >
            <FlexibleDiv
              justifyContent="flex-start"
              className="top__wrapper"
              width="fit-content"
            >
              <div
                className="single__item__wrapper"
                onClick={() => setShowFilter(!showFilter)}
              >
                <img src={Filter.src} alt="filter" />
                <p>Filter</p>
              </div>
            </FlexibleDiv>
            <Select
              style={{ width: 90 }}
              placeholder="Size"
              options={phoneOptions}
            />
          </FlexibleDiv>

          <div>
            <Select
              style={{ width: 150 }}
              placeholder="Sort by"
              options={ratingOptions}
            />
          </div>

          {/* The popup for product filter */}
          <FlexibleDiv
            className={`filter__wrapper ${showFilter ? "" : "hide__box"}`}
            flexDir="column"
            justifyContent="flex-start"
            ref={popupRef}
          >
            <FlexibleDiv
              justifyContent="space-between"
              className="filter__wrapper__top__section"
            >
              <div className="top__section__filter__box">
                <img src={Filter.src} alt="filter" /> <p>Filter</p>
              </div>
              <CloseIcon
                color="#616161"
                size={15}
                style={{ cursor: "pointer" }}
                onClick={() => setShowFilter(false)}
              />
            </FlexibleDiv>
            {categoryBox("Category")}
            <Checkbox.Group options={options} onChange={onChangeCategory} />
            {/* Category filtering starts here */}
            {categories?.length === 1 &&
              subCategories.map((sgn, idx) => (
                <div key={idx}>
                  {categoryBox(sgn.name)}
                  <Checkbox.Group
                    options={sgn.options}
                    onChange={onChangeSubCategory}
                  />
                </div>
              ))}
            {categoryBox("Price Range")}
            <FlexibleDiv
              className="price__range__wrapper"
              flexDir="column"
              width="100%"
            >
              <input
                type="range"
                id="price-range"
                name="price-range"
                className="price__range"
                min="1000"
                max="50000"
                defaultValue={sliderPrice}
                onChange={({ target }) => {
                  setSliderPrice(target.value);
                }}
              />
              <FlexibleDiv
                width="100%"
                justifyContent="space-between"
                flexWrap="nowrap"
                className="price__slider"
              >
                <p>{nairaFormatter.format(sliderPrice)}</p>
                <p>of</p>
                <p>{nairaFormatter.format(50000)}</p>
              </FlexibleDiv>
            </FlexibleDiv>
            <Button>Apply Filter</Button>
          </FlexibleDiv>
        </FlexibleDiv>
        {/* The page content */}
        <FlexibleDiv
          width="100%"
          justifyContent="space-between"
          margin="30px 0 0 0"
        >
          {smartphoneDealsData.map((sgn, idx) => (
            <ProductCard card={sgn} key={idx} />
          ))}
        </FlexibleDiv>
      </ShopPageWrapper>
    </GeneralLayout>
  );
}
