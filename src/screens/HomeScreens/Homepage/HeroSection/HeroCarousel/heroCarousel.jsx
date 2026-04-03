import { FlexibleDiv } from "@/components/lib/Box/styles";
import { HeroCarouselWrapper, BannerBox } from "./heroCarousel.styles";
import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoIosArrowBack as BackArrow } from "react-icons/io";
import { IoIosArrowForward as ForwardArrow } from "react-icons/io";
import Button from "@/components/lib/Button";

export default function HeroCarousel({ content }) {
  return (
    <HeroCarouselWrapper>
      <CarouselProvider
        className="carousel__container"
        totalSlides={3}
        infinite={true}
        isPlaying
      >
        <Slider className="carousel__slider">
          {content.map((sgn, idx) => (
            <Slide key={idx} index={idx}>
              <BannerBox bgimage={sgn.image}>
                <FlexibleDiv className="text__section">
                  {/* <h1 className="hero__text">{sgn.heroText}</h1> */}
                  {/* <p className="hero__sub__text">{sgn.heroSubText}</p> */}
                </FlexibleDiv>
                {/* <Button
                  backgroundColor="var(--orrsiWhite)"
                  radius="10px"
                  padding="0px 50px"
                  onClick={() =>
                    window.open(
                      sgn.btnLink,
                      `${sgn.openInNewTab ? "" : "_self"}`
                    )
                  }
                >
                  {sgn.btnText}
                </Button> */}
              </BannerBox>
              <DotGroup className="custom__carousel__dot" />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="custom__carousel__button button__left__position">
          <BackArrow color="#fff" />
        </ButtonBack>
        <ButtonNext className="custom__carousel__button button__right__position">
          <ForwardArrow color="#fff" />
        </ButtonNext>
      </CarouselProvider>
    </HeroCarouselWrapper>
  );
}
