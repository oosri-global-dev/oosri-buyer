import { FlexibleDiv } from "../Box/styles";
import { PGWrapper } from "./productGrid.styles";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import SingleCard from "./SingleCard/singleCard";
import { useWindowSize } from "@/data-helpers/hooks";
import { useState, useEffect } from "react";

export default function ProductGrid({ gridTitle }) {
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
      <PGWrapper>
        <FlexibleDiv flexDir="row" justifyContent="space-between">
          <h2>{gridTitle}</h2>
          <p className="view__all__style">View All</p>
          <FlexibleDiv className="grid__wrapper">
            {smartphoneDealsData.map((product, idx) => (
              <>
                {isMobile ? (
                  <>{idx < 4 && <SingleCard key={idx} product={product} />}</>
                ) : (
                  <SingleCard key={idx} product={product} />
                )}
              </>
            ))}
          </FlexibleDiv>
        </FlexibleDiv>
      </PGWrapper>
    );
}
