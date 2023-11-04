import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Breadcrumb from "./Breadcrumb/breadcrumb";
import { PPWrapper } from "./shopPage.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Filter from "@/assets/images/filter.svg";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { useState } from "react";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { Checkbox } from "antd";
import Button from "@/components/lib/Button";

export default function ProductPage() {
  const [showFilter, setShowFilter] = useState(false);
  const options = [
    { label: "Mobile Phones", value: "Mobile Phones" },
    { label: "Wristwatch", value: "Wristwatch" },
    { label: "Tablet", value: "Tablet" },
    { label: "Computer Accessories", value: "Computer Accessories" },
  ];

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
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
  return (
    <GeneralLayout>
      <Breadcrumb numOfProducts={19233} />
      <PPWrapper>
        <hr />
        <FlexibleDiv
          justifyContent="space-between"
          width="100%"
          flexWrap="nowrap"
        >
          <FlexibleDiv justifyContent="flex-start" className="top__wrapper">
            <div
              className="single__item__wrapper"
              onClick={() => setShowFilter(!showFilter)}
            >
              <img src={Filter.src} alt="filter" />
              <p>Filter</p>
            </div>

            <FlexibleDiv
              className={`filter__wrapper ${showFilter ? "" : "hide__box"}`}
              flexDir="column"
              justifyContent="flex-start"
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
              <Checkbox.Group options={options} onChange={onChange} />
              <Button>Apply Filter</Button>
            </FlexibleDiv>
          </FlexibleDiv>
          <div>
            <img src={Filter.src} alt="filter" />
          </div>
        </FlexibleDiv>
      </PPWrapper>
    </GeneralLayout>
  );
}
