import React, { useEffect, useState } from "react";
import { HomepageWrapper } from "./homepage.styles";
import HeroSection from "./HeroSection/heroSection";
import SmartphoneDeals from "./SmartphoneDeals/smartphoneDeals";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import ProductGrid from "@/components/lib/ProductGrid/productGrid";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";

export default function Homepage() {
  return (
    <HomepageWrapper>
      <HeroSection />
      <SmartphoneDeals content={smartphoneDealsData} />
      <ProductCarousel carouselTitle={`Today's Deals`} />
      <ProductCarousel carouselTitle={`Top Phones Deals`} />
      <ProductGrid gridTitle={"Best Prices For You"} />
    </HomepageWrapper>
  );
}
