import { FlexibleDiv } from "../Box/styles";
import ProductCard from "../ProductCard/productCard";
import { PCWrapper } from "./productCarousel.styles";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { IoIosArrowForward as ForwardArrow } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export default function ProductCarousel({ carouselTitle }) {
  const carouselRef = useRef(null);
  const [scrollPositionX, setscrollPositionX] = useState(0);
  const handleCardScroll = (direction) => {
    if (direction === "left") {
      carouselRef.current.scrollLeft -= 280;
    } else {
      carouselRef.current.scrollLeft += 280;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = carouselRef.current;
      setscrollPositionX(el.scrollLeft);
    };

    const element = carouselRef.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PCWrapper>
      {carouselTitle && <h2 className="carousel__title">{carouselTitle}</h2>}
      <FlexibleDiv className="product__card__carousel" ref={carouselRef}>
        {smartphoneDealsData.map((product, idx) => (
          <ProductCard key={idx} card={product} />
        ))}
        <FlexibleDiv
          className={`button__wrapper ${
            scrollPositionX < 1 ? "flex__end__div" : ""
          } 
          `}
          justifyContent="space-between"
        >
          <button
            className={`button__left__position ${
              scrollPositionX < 1 ? "hide__button" : ""
            }`}
            onClick={() => handleCardScroll("left")}
          >
            <BackArrow color="#fff" size={30} />
          </button>

          <button
            className="button__right__position"
            onClick={() => handleCardScroll("right")}
          >
            <ForwardArrow color="#fff" size={30} />
          </button>
        </FlexibleDiv>
      </FlexibleDiv>
    </PCWrapper>
  );
}
