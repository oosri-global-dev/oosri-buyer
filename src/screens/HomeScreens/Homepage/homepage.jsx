import React from "react";
import { HomepageWrapper } from "./homepage.styles";
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import HeroSection from "./HeroSection/heroSection";
import SmartphoneDeals from "../SmartphoneDeals/smartphoneDeals";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import ProductGrid from "@/components/lib/ProductGrid/productGrid";

export default function Homepage() {
  return (
    <GeneralLayout>
      <HomepageWrapper>
        <HeroSection />
        <SmartphoneDeals />
        <ProductCarousel carouselTitle={`Today's Deals`} />
        <ProductCarousel carouselTitle={`Top Phones Deals`} />
        <ProductGrid gridTitle={"Best Prices For You"} />
      </HomepageWrapper>
    </GeneralLayout>
  );
}
