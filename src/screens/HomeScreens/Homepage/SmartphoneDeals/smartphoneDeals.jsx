import { FlexibleDiv } from "@/components/lib/Box/styles";
import { SDWrapper, CardWrapper } from "./smartphoneDeals.styles";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useState, useEffect } from "react";
import { useWindowSize } from "@/data-helpers/hooks";
import Link from "next/link";

export default function SmartphoneDeals({
  content,
  sectionTitle = "SmartPhone Deals",
  showViewAll = true,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width < 440) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <SDWrapper>
      <FlexibleDiv
        className="top__section__container"
        justifyContent="space-between"
        alignItems="center"
      >
        <h2>{sectionTitle}</h2>
        {showViewAll && (
          <Link className="view__all__style" href={"/shop"}>
            View All
          </Link>
        )}
      </FlexibleDiv>
      {content.map((card, idx) => (
        <>
          {isMobile ? (
            <>{idx < 4 && <ProductCard card={card} key={idx} />}</>
          ) : (
            <ProductCard card={card} key={idx} />
          )}
        </>
      ))}
    </SDWrapper>
  );
}
