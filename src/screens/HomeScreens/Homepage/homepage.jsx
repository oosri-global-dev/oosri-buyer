import React from "react";
import { HomepageWrapper } from "./homepage.styles";
import HeroSection from "./HeroSection/heroSection";
import ProductsGridBox from "./ProductsGridBox/productsGridBox";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import ProductGrid from "@/components/lib/ProductGrid/productGrid";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import { useProductCategoriesQuery, useProductsQuery } from "@/network/product";

export default function Homepage() {
  // const { data: products, isLoading, error } = useProductsQuery();
  const { data: productCategories, isLoading } = useProductCategoriesQuery();
  const { data: topJewelryDeals, isLoading: isLoadingTopJewelryDeals } =
    useProductsQuery("", 10);

  console.log("Top Jewelry Deals:", topJewelryDeals);

  return (
    <HomepageWrapper>
      <HeroSection
        productCategories={productCategories?.data}
        loadingCategories={isLoading}
      />
      <ProductsGridBox
        content={topJewelryDeals?.body?.products || []}
        sectionTitle={"Top Jewelry Deals"}
        loading={isLoadingTopJewelryDeals}
      />
      {/* <ProductCarousel carouselTitle={`Today's Deals`} />
      <ProductCarousel carouselTitle={`Top Phones Deals`} />
      <ProductGrid gridTitle={"Best Prices For You"} /> */}
    </HomepageWrapper>
  );
}
