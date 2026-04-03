import React from "react";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import { useProductsQuery } from "@/network/product";

export default function CategorySection({ category }) {
    const { data: productsData, isLoading } = useProductsQuery(
        [category?.name],
        10,
        `category-${category?._id}`
    );

    return (
        <ProductCarousel
            content={productsData?.body?.products || []}
            carouselTitle={category?.name}
            loading={isLoading}
            hideIfEmpty={true}
        />
    );
}
