import { FlexibleDiv } from "../Box/styles";
import { PGWrapper } from "./productGrid.styles";
import SingleGridCard from "./SingleGridCard/singleGridCard";
import { useWindowSize } from "@/data-helpers/hooks";
import { useState, useEffect } from "react";

export default function ProductGrid({ gridTitle, loading = false, content }) {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width < 440) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  if ((!content || content.length === 0) && !loading) return null;

  return (
    <PGWrapper>
      <FlexibleDiv flexDir="row" justifyContent="space-between">
        <h2>{gridTitle}</h2>
        <p className="view__all__style">View All</p>
        <FlexibleDiv className="grid__wrapper">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, idx) => (
                <SingleGridCard key={idx} isLoading={true} />
              ))}
            </>
          ) : (
            <>
              {content &&
                content.map((product, idx) => (
                  <>
                    {isMobile ? (
                      <>
                        {idx < 4 && (
                          <SingleGridCard key={idx} product={product} />
                        )}
                      </>
                    ) : (
                      <SingleGridCard key={idx} product={product} />
                    )}
                  </>
                ))}
            </>
          )}
        </FlexibleDiv>
      </FlexibleDiv>
    </PGWrapper>
  );
}
