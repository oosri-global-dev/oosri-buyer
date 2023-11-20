import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import {
  ProductPageWrapper,
  ProductBreadcrumbsWrapper,
} from "./productPage.styles";
import { FlexibleDiv, FlexibleSection } from "@/components/lib/Box/styles";
import { iPhone14ProMax } from "@/data-helpers/product-page-helper";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { useState } from "react";
import { FiPlus as PlusIcon } from "react-icons/fi";
import { HiOutlineMinusSmall as MinusIcon } from "react-icons/hi2";
import Button from "@/components/lib/Button";
import { Tabs, theme } from "antd";
import StickyBox from "react-sticky-box";
import ProductDescription from "./sections/productDescription";

function NoOfProductReviews({ numOfReviews }) {
  return (
    <div className="product__reviews">
      <p>Customer Reviews</p>
      <p className="num__of__reviews">{numOfReviews || 67}</p>
    </div>
  );
}

export default function ProductPage() {
  const convertIntToArray = (num) => {
    let res = [];

    for (let i = 0; i < num; i++) {
      res.push(["0"]);
    }

    return res;
  };
  const [idxOfSelectedImage, setIdxOfSelectedImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [numOfProduct, setNumOfProduct] = useState(1);
  const [previousLinks, setPreviousLink] = useState([
    "Home",
    "Smartphone Deals",
    "iPhone 14 Pro Max",
  ]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  const items = [
    {
      label: "Product Description",
      key: 1,
      children: <ProductDescription />,
      style: {},
    },
    {
      label: <NoOfProductReviews numOfReviews={67} />,
      key: 2,
      children: "",
      style: {},
    },
  ];

  const newItems = new Array(3).fill(null).map((_, i) => {
    const id = String(i + 1);
    return {
      label: `Tab ${id}`,
      key: id,
      children: `Content of Tab Pane ${id}`,
      style: i === 0 ? { height: 200 } : undefined,
    };
  });

  return (
    <GeneralLayout>
      {/* Breacrumb starts here */}
      <ProductBreadcrumbsWrapper>
        {previousLinks.map((sgn, idx) => (
          <p className={`${idx === 2 ? "product__text" : ""}`} key={idx}>
            {" "}
            {sgn} {idx === 2 ? "" : " / "}
          </p>
        ))}
      </ProductBreadcrumbsWrapper>
      {/* Breacrumb ends here */}
      <ProductPageWrapper>
        <FlexibleSection
          className="top__section"
          flexWrap="nowrap"
          alignItems="flex-start"
        >
          <FlexibleDiv
            flexDir="row"
            flexWrap="nowrap"
            width="100%"
            justifyContent="space-between"
            alignItems="flex-start"
            className="top__left__section"
            gap="20px"
          >
            <FlexibleDiv className="image__section" flexDir="column" gap="10px">
              {iPhone14ProMax.images.map((sgn, idx) => (
                <img
                  src={sgn}
                  className={`${
                    idxOfSelectedImage === idx ? "selected__image" : ""
                  }`}
                  onClick={() => {
                    setIdxOfSelectedImage(idx);
                    setSelectedImage(sgn);
                  }}
                  alt={`phone__${idx}`}
                  key={idx}
                />
              ))}
            </FlexibleDiv>
            <FlexibleDiv className="main__image__wrapper">
              {/* This will handle loader for the product image */}
              {selectedImage ? (
                <img
                  className="main__image"
                  src={selectedImage}
                  alt={`main__1`}
                />
              ) : (
                <img
                  className="main__image"
                  src={iPhone14ProMax.images[0]}
                  alt={`main__1`}
                />
              )}
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv
            className="top__right__section"
            flexDir="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap="10px"
          >
            <p className="item__name">{iPhone14ProMax?.name}</p>
            <h1 className="item__price">{iPhone14ProMax?.price}</h1>
            <FlexibleDiv
              flexDir="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="8px"
            >
              <FlexibleDiv
                className="like__wrapper__box"
                justifyContent="flex-start"
                flexWrap="nowrap"
              >
                {convertIntToArray(iPhone14ProMax?.likes).map((sgn, idx) => (
                  <LikeIcon color="#FCCB1B" key={idx} />
                ))}
                <p>{iPhone14ProMax?.likes}.0</p>
              </FlexibleDiv>

              <p className="other__details__text reviews__text">
                {iPhone14ProMax?.numOfReviews} reviews
              </p>
              <p className="other__details__text">
                {iPhone14ProMax?.numOfPurchase} reviews
              </p>
              <p className="other__details__text">
                Shipping Fee: {iPhone14ProMax?.shippingFee} reviews
              </p>
            </FlexibleDiv>
            {/* The carting options */}
            <FlexibleDiv className="cart__options" gap="15px">
              <FlexibleDiv className="product__num__selector" gap="16px">
                <MinusIcon
                  className="icon__class"
                  size={18}
                  onClick={() => {
                    if (numOfProduct > 1) {
                      setNumOfProduct(numOfProduct - 1);
                    }
                  }}
                />
                <p>{numOfProduct < 10 ? `0${numOfProduct}` : numOfProduct}</p>
                <PlusIcon
                  className="icon__class"
                  size={18}
                  onClick={() => setNumOfProduct(numOfProduct + 1)}
                />
              </FlexibleDiv>
              <Button
                backgroundColor="var(--orrsiPrimary)"
                color="#fff"
                className="checkout__btn"
              >
                Checkout
              </Button>
              <Button
                backgroundColor="#fff"
                color="var(--orrsiPrimary)"
                className="cart__btn"
              >
                Add to Cart
              </Button>
            </FlexibleDiv>
          </FlexibleDiv>
        </FlexibleSection>
        {/* Product description starts here */}
        <FlexibleDiv
          className="product__description"
          justifyContent="flex-start"
        >
          <Tabs
            style={{ width: "100%", marginTop: "50px", marginBottom: "30px" }}
            defaultActiveKey="1"
            renderTabBar={renderTabBar}
            items={items}
          />
        </FlexibleDiv>
      </ProductPageWrapper>
    </GeneralLayout>
  );
}



