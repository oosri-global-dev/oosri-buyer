import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import { ProductPageWrapper } from "./productPage.styles";
import { FlexibleDiv, FlexibleSection } from "@/components/lib/Box/styles";
import { iPhone14ProMax } from "@/data-helpers/product-page-helper";
import { AiFillStar as LikeIcon } from "react-icons/ai";

export default function ProductPage() {
  return (
    <GeneralLayout>
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
                <img src={sgn} alt={`phone__${idx}`} key={idx} />
              ))}
            </FlexibleDiv>
            <FlexibleDiv className="main__image__wrapper">
              <img
                className="main__image"
                src={iPhone14ProMax.images[0]}
                alt={`main__1`}
              />
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv
            className="top__right__section"
            flexDir="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <p className="item__name">Iphone 14 Pro Max</p>
            <h1 className="item__price">₦410,000</h1>
            <FlexibleDiv>
              {
                
              }
                <LikeIcon />
            </FlexibleDiv>
          </FlexibleDiv>
        </FlexibleSection>
      </ProductPageWrapper>
    </GeneralLayout>
  );
}
