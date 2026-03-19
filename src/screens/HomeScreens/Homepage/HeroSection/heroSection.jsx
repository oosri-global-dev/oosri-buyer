import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeroCarousel from "./HeroCarousel/heroCarousel";
import { HeroSectionWrapper } from "./heroSection.styles";
import { heroBannerFiles } from "@/data-helpers/homepage-helper";
import WelcomeImage from "@/assets/images/homepage/welcome.gif";
import SingleCategoryBox from "@/components/lib/SingleCategoryBox/single-category-box";
import { LoadingCategoryBox } from "@/components/lib/SingleCategoryBox/loading-category-box";

export default function HeroSection({ productCategories, loadingCategories }) {
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
      {loadingCategories ? (
        <FlexibleDiv className="category__wrapper loader__wrapper">
          {[...Array(4)].map((_, idx) => (
            <LoadingCategoryBox key={idx} />
          ))}
        </FlexibleDiv>
      ) : (
        !!productCategories && (
          <FlexibleDiv className="category__wrapper" flexWrap="nowrap">
            {productCategories.map((catg, idx) => (
              <SingleCategoryBox data={catg} key={idx} />
            ))}
          </FlexibleDiv>
        )
      )}
    </HeroSectionWrapper>
  );
}
