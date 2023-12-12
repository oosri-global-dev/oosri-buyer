import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeroCarousel from "./HeroCarousel/heroCarousel";
import { HeroSectionWrapper } from "./heroSection.styles";
import { heroBannerFiles } from "@/data-helpers/homepage-helper";
import WelcomeImage from '@/assets/images/homepage/welcome.gif'
import SingleCategoryBox from "@/components/lib/SingleCategoryBox/single-category-box";
import { homepageCategoryData } from "@/data-helpers/homepage-helper";

export default function HeroSection() {
  const categories = [
    "Phones",
    "Wristwatches",
    "Computer Accessories",
    "Tablets",
  ];

  return (
    <HeroSectionWrapper>
      <FlexibleDiv flexDir="column">
        <img
          src={WelcomeImage.src}
          alt="welcome__png"
          className="welcome__image__box"
        />
      </FlexibleDiv>
      <HeroCarousel content={heroBannerFiles} />
      {/* categories */}
      <FlexibleDiv className="category__wrapper">
        {homepageCategoryData.map((catg, idx) => (
          <SingleCategoryBox data={catg} key={idx} />
        ))}
      </FlexibleDiv>
    </HeroSectionWrapper>
  );
}
