import { FlexibleDiv } from "@/components/lib/Box/styles";
import { SDWrapper, CardWrapper } from "./smartphoneDeals.styles";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useState, useEffect } from "react";
import { useWindowSize } from "@/data-helpers/hooks";

export default function SmartphoneDeals({ content }) {
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
      <FlexibleDiv className="top__section" justifyContent="space-between" alignItems="center">
        <h2>SmartPhone Deals</h2>
        <p className="view__all__style">View All</p>
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
