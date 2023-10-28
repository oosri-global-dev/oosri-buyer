import { FlexibleDiv } from "../Box/styles";
import ProductCard from "../ProductCard/productCard";
import { PCWrapper } from "./productCarousel.styles";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { IoIosArrowForward as ForwardArrow } from "react-icons/io";
import { useRef } from "react";

export default function ProductCarousel({ carouselTitle }) {
  const carouselRef = useRef(null);

  const scrollCardContainer = (direction) => {
    if (direction === "left") {
      carouselRef.current.scrollLeft -= 280;
    } else {
      carouselRef.current.scrollLeft += 280;
    }
  };

  return (
    <PCWrapper>
      {carouselTitle && <h2 className="carousel__title">{carouselTitle}</h2>}
      <FlexibleDiv className="product__card__carousel" ref={carouselRef}>
        {smartphoneDealsData.map((product, idx) => (
          <ProductCard key={idx} card={product} />
        ))}
        <FlexibleDiv className="button__wrapper" justifyContent="space-between">
          <button
            className="button__left__position"
            onClick={() => scrollCardContainer("left")}
          >
            <BackArrow color="#fff" size={30} />
          </button>
          <button
            className="button__right__position"
            onClick={() => scrollCardContainer("right")}
          >
            <ForwardArrow color="#fff" size={30} />
          </button>
        </FlexibleDiv>
      </FlexibleDiv>
    </PCWrapper>
  );
}
