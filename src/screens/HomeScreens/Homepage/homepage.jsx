import React from "react";
import { HomepageWrapper } from "./homepage.styles";
import HeroSection from "./HeroSection/heroSection";
import ProductsGridBox from "./ProductsGridBox/productsGridBox";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import ProductGrid from "@/components/lib/ProductGrid/productGrid";
import { useProductCategoriesQuery, useProductsQuery } from "@/network/product";

export default function Homepage() {
  const { data: productCategories, isLoading } = useProductCategoriesQuery();
  const { data: topJewelryDeals, isLoading: isLoadingTopJewelryDeals } =
    useProductsQuery(["Jewelry"], 10, "top-jewelry-deals");
  const { data: topTextilesDeals, isLoading: isLoadingTopTextilesDeals } =
    useProductsQuery(["Textiles/Fabrics"], 10, "top-textiles-deals");
  const { data: paintingDeals, isLoading: isLoadingPaintingDeals } =
    useProductsQuery(["Paintings"], 10, "painting-deals");
  const { data: sculptureDeals, isLoading: isLoadingSculptureDeals } =
    useProductsQuery(["Sculpture"], 10, "sculpture-deals");

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
      <ProductCarousel
        content={topTextilesDeals?.body?.products || []}
        carouselTitle={`Textiles & Fabrics Deals`}
        loading={isLoadingTopTextilesDeals}
      />
      <ProductCarousel
        content={paintingDeals?.body?.products || []}
        carouselTitle={`Paintings`}
        hideIfEmpty={true}
        loading={isLoadingPaintingDeals}
      />
      <ProductGrid
        gridTitle={"Sculpture Deals"}
        loading={isLoadingSculptureDeals}
        content={sculptureDeals?.body?.products || []}
      />
    </HomepageWrapper>
  );
}
