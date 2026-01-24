import React, { useEffect, useMemo } from "react";
import {
  ProductPageWrapper,
  ProductBreadcrumbsWrapper,
} from "./productPage.styles";
import { FlexibleDiv, FlexibleSection } from "@/components/lib/Box/styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { useState } from "react";
import { useMainContext } from "@/context";
import _ from "lodash";
import { FiPlus as PlusIcon } from "react-icons/fi";
import { HiOutlineMinusSmall as MinusIcon } from "react-icons/hi2";
import Button from "@/components/lib/Button";
import { Tabs, theme, Spin } from "antd";
import StickyBox from "react-sticky-box";
import ProductDescription from "./sections/product-desc/productDescription";
import ProductReviewBox from "./sections/product-reviews/productReview";
import Link from "next/link";
import ProductsGridBox from "../HomeScreens/Homepage/ProductsGridBox/productsGridBox";
import { useRouter } from "next/router";
import OorsiLoader from "@/components/lib/Loader/loader";
import { formatCurrency } from "@/data-helpers/hooks";
import Image from "next/image";
import { MoreReviews } from "./sections/more-reviews/moreReviews";
import { getAllReviews } from "@/network/reviews";

function NoOfProductReviews({ numOfReviews }) {
  return (
    <div className="product__reviews">
      <p>Customer Reviews</p>
      <p className="num__of__reviews">{numOfReviews || 0}</p>
    </div>
  );
}

export default function ProductPage({ product, loading, relatedProducts }) {
  const { push, query } = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, dispatch } =
    useMainContext();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [idxOfSelectedImage, setIdxOfSelectedImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [numOfProduct, setNumOfProduct] = useState(1);
  const [isLoadingIncrease, setIsLoadingIncrease] = useState(false);
  const [isLoadingDecrease, setIsLoadingDecrease] = useState(false);
  const [moreReviewsActive,setMoreReviewsActive]=useState(false)
  const [reviewData,setReviewData]=useState([])
  const[starData,setStarData]=useState([])
  const [activeTab, setActiveTab] = useState("1");


  const productInCart = useMemo(
    () => cart.find((item) => item?._id === product?._id),
    [cart, product]
  );

  useEffect(() => {
    if (productInCart) {
      setNumOfProduct(productInCart.quantity);
    } else {
      setNumOfProduct(1);
    }
  }, [productInCart]);

  // functions
  function getBreadcrumbArray(categoryName, productName) {
    return [
      { label: "Home", link: "/" },
      {
        label: categoryName,
        link: `/shop?category=${encodeURIComponent(categoryName)}`,
      },
      { label: productName, link: "#" },
    ];
  }
  const convertIntToArray = (num) => {
    let res = [];
    for (let i = 0; i < num; i++) {
      res.push(["0"]);
    }
    return res;
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  const handleMoreReviews=()=>{
    setMoreReviewsActive(true)
  }

  // const reviews = [
  //   {
  //     reviewerName: "Mike Tyson",
  //     likes: 4,
  //     review:
  //       "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
  //   },
  //   {
  //     reviewerName: "Mike Tyson",
  //     likes: 3,
  //     review:
  //       "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
  //   },
  //   {
  //     reviewerName: "Mike Tyson",
  //     likes: 5,
  //     review:
  //       "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
  //   },
  //   {
  //     reviewerName: "Mike Tyson",
  //     likes: 1,
  //     review:
  //       "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
  //   },
  // ];

  const items = [
    {
      label: "Product Description",
      key: 1,
      children: (
        <ProductDescription content={product?.productDescription || ""} />
      ),
      style: {},
    },
    {
      label: <NoOfProductReviews numOfReviews={reviewData?.length} />,
      key: 2,
      children: <ProductReviewBox reviews={reviewData} />,
      style: {},
    },
  ];

  // SSR: use product prop
  useEffect(() => {
    if (product && product.productImages && product.productImages.length > 0) {
      setSelectedImage(product.productImages[0]);
      setIdxOfSelectedImage(0);
    }
  }, [product]);

    const fetchReviews = async (id) => {
      const data = await getAllReviews(id);
      setReviewData(data?.body?.reviews)
      console.log(data?.body?.ratingSummary)
      setStarData(data?.body?.ratingSummary)
    };

    useEffect(() => {
      if (product?._id) {
      fetchReviews(product._id);
      }
    }, [product]);

  const handleBack=()=>{
    setMoreReviewsActive(false)
    setActiveTab(1)
  }

  if (loading) {
    return <OorsiLoader />;
  }

  return (
    <>
      {/* Breacrumb starts here */}
      <ProductBreadcrumbsWrapper>
        {getBreadcrumbArray(
          product?.category || "",
          product?.productName || ""
        ).map((sgn, idx) =>
          idx < 2 ? (
            <React.Fragment key={idx}>
              <Link
                href={sgn.link}
                className={idx === 2 ? "product__text" : ""}
              >
                {sgn.label}
              </Link>
              {idx < 2 && <span className="breadcrumb__slash"> / </span>}
            </React.Fragment>
          ) : (
            <span className="product__text no__hover" key={idx}>
              {sgn.label}
            </span>
          )
        )}
      </ProductBreadcrumbsWrapper>
      {/* Breacrumb ends here */}
      <ProductPageWrapper>
        {!moreReviewsActive ? (
          <>
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
                <FlexibleDiv
                  className="image__section"
                  flexDir="column"
                  gap="10px"
                >
                  {product?.productImages?.map((sgn, idx) => (
                    <div key={idx} className="images__wrapper">
                      <Image
                        src={sgn}
                        onClick={() => {
                          setIdxOfSelectedImage(idx);
                          setSelectedImage(sgn);
                        }}
                        className={`${
                          idxOfSelectedImage === idx ? "selected__image" : ""
                        }`}
                        alt={`phone__${idx}`}
                        fill
                        objectFit="cover"
                      />
                    </div>
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
                      src={product?.productImages?.[0] || ""}
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
                <p className="item__name">{product?.productName}</p>
                <h1 className="item__price">
                  {formatCurrency(product?.regularPrice)}
                </h1>
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
                    {convertIntToArray(product?.productRating || 0).map(
                      (sgn, idx) => (
                        <LikeIcon color="#FCCB1B" key={idx} />
                      )
                    )}
                    <p>{product?.productRating || 0}.0</p>
                  </FlexibleDiv>

                  <p className="other__details__text reviews__text">
                    {product?.numOfReviews} reviews
                  </p>
                  <p className="other__details__text">
                    {product?.numOfPurchase} purchases
                  </p>
                  <p className="other__details__text">
                    Shipping Fee: {formatCurrency(product?.shippingFee || 0)}
                  </p>
                </FlexibleDiv>
                {/* The carting options */}
                <FlexibleDiv className="cart__options" gap="15px">
                  <FlexibleDiv className="product__num__selector" gap="16px">
                    <FlexibleDiv
                      className="icon__class"
                      flexDir="row"
                      flexWrap="nowrap"
                      width="fit-content"
                      onClick={async () => {
                        if (numOfProduct > 1 && !isLoadingDecrease) {
                          if (productInCart) {
                            await updateQuantity(
                              product,
                              numOfProduct - 1,
                              setIsLoadingDecrease
                            );
                            setNumOfProduct(numOfProduct - 1);
                          } else {
                            dispatch({
                              type: "TOAST_BOX",
                              payload: {
                                type: "error",
                                message: "Sorry, item is not in cart.",
                              },
                            });
                          }
                        }
                      }}
                    >
                      {isLoadingDecrease ? (
                        <Spin size="small" />
                      ) : (
                        <MinusIcon size={18} />
                      )}
                    </FlexibleDiv>
                    <p>
                      {numOfProduct < 10 ? `0${numOfProduct}` : numOfProduct}
                    </p>
                    <FlexibleDiv
                      className="icon__class"
                      width="fit-content"
                      onClick={async () => {
                        if (!isLoadingIncrease) {
                          if (productInCart) {
                            await updateQuantity(
                              product,
                              numOfProduct + 1,
                              setIsLoadingIncrease
                            );
                            setNumOfProduct(numOfProduct + 1);
                          } else {
                            dispatch({
                              type: "TOAST_BOX",
                              payload: {
                                type: "error",
                                message: "Sorry, item is not in cart.",
                              },
                            });
                          }
                        }
                      }}
                    >
                      {isLoadingIncrease ? (
                        <Spin size="small" />
                      ) : (
                        <PlusIcon size={18} />
                      )}
                    </FlexibleDiv>
                  </FlexibleDiv>
                  <Button
                    backgroundColor="var(--orrsiPrimary)"
                    color="#fff"
                    className="checkout__btn"
                    onClick={() => push("/cart")}
                  >
                    Checkout
                  </Button>
                  <Button
                    backgroundColor="#fff"
                    color="var(--orrsiPrimary)"
                    className="cart__btn"
                    onClick={() => {
                      if (productInCart) {
                        removeFromCart(product, setIsLoadingBtn);
                      } else {
                        addToCart(
                          { ...product, quantity: numOfProduct },
                          setIsLoadingBtn
                        );
                      }
                    }}
                    loading={isLoadingBtn}
                  >
                    {productInCart ? "Remove from Cart" : "Add to Cart"}
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
                style={{
                  width: "100%",
                  marginTop: "50px",
                  marginBottom: "30px",
                }}
                defaultActiveKey="1"
                renderTabBar={renderTabBar}
                items={items}
                onChange={(key) => setActiveTab(key)}
              />
              {activeTab === 2 &&
                (reviewData?.length > 0 ? (
                  <div
                    className="see__more_btn"
                    style={{ cursor: "pointer" }}
                    onClick={handleMoreReviews}
                  >
                    <p className="see__more__reviews">See more reviews</p>
                  </div>
                ) : (
                  <FlexibleDiv>
                    <p>No review Here</p>
                  </FlexibleDiv>
                ))}
            </FlexibleDiv>
            {/* Related Products Section */}
            <FlexibleDiv
              justifyContent="flex-start"
              alignItems="flex-start"
              margin="20px 0"
            >
              <ProductsGridBox
                content={relatedProducts || []}
                sectionTitle="More Products"
                showViewAll={false}
              />
            </FlexibleDiv>
          </>
        ) : (
          <FlexibleDiv>
            <MoreReviews
              id={product?._id}
              starData={starData}
              reviewData={reviewData}
              setMoreReviewsActive={handleBack}
            />
          </FlexibleDiv>
        )}
      </ProductPageWrapper>
    </>
  );
}