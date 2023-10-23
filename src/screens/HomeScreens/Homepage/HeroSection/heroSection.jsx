import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeroCarousel from "./HeroCarousel/heroCarousel";
import { HeroSectionWrapper } from "./heroSection.styles";
import { heroBannerFiles } from "@/data-helpers/homepage-helper";

export default function HeroSection() {
    
  return (
    <HeroSectionWrapper>
      <FlexibleDiv flexDir="column">
        <h1 className="introductory__text">Welcome to Orrsi</h1>
        <p className="introductory__subText">
          Striving to bridge gap between traders
        </p>
      </FlexibleDiv>
      <HeroCarousel content={heroBannerFiles} />
    </HeroSectionWrapper>
  );
}
