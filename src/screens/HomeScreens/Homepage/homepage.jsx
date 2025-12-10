import React from "react";
import { HomepageWrapper } from "./homepage.styles";
import HeroSection from "./HeroSection/heroSection";
import { useProductCategoriesQuery } from "@/network/product";
import CategorySection from "./CategorySection/categorySection";

export default function Homepage() {
  const { data: productCategories, isLoading } = useProductCategoriesQuery();

  return (
    <HomepageWrapper>
      <HeroSection
        productCategories={productCategories?.data}
        loadingCategories={isLoading}
      />
      {productCategories?.data?.map((category) => (
        <CategorySection key={category._id} category={category} />
      ))}
    </HomepageWrapper>
  );
}
