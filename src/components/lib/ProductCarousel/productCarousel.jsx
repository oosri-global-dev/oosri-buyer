import { FlexibleDiv } from "../Box/styles";
import ProductCard from "../ProductCard/productCard";
import { PCWrapper } from "./productCarousel.styles";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { IoIosArrowForward as ForwardArrow } from "react-icons/io";

export default function ProductCarousel({ carouselTitle }) {
  return (
    <PCWrapper>
      {carouselTitle && <h2 className="carousel__title">{carouselTitle}</h2>}
      <FlexibleDiv className="product__card__carousel">
        {smartphoneDealsData.map((product, idx) => (
          <ProductCard key={idx} card={product} />
        ))}
        <FlexibleDiv className="button__wrapper" justifyContent="space-between">
          <button className="button__left__position">
            <BackArrow color="#fff" size={30} />
          </button>
          <button className="button__right__position">
            <ForwardArrow color="#fff" size={30} />
          </button>
        </FlexibleDiv>
      </FlexibleDiv>
    </PCWrapper>
  );
}
