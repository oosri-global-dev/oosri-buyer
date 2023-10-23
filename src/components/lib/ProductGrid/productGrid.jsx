import { FlexibleDiv } from "../Box/styles";
import { PGWrapper } from "./productGrid.styles";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import SingleCard from "./SingleCard/singleCard";

export default function ProductGrid({ gridTitle }) {
  return (
    <PGWrapper>
      <FlexibleDiv flexDir="row" justifyContent="space-between">
        <h2>{gridTitle}</h2>
        <p className="view__all__style">View All</p>
        <FlexibleDiv className="grid__wrapper">
          {smartphoneDealsData.map((product, idx) => (
            <SingleCard key={idx} product={product} />
          ))}
        </FlexibleDiv>
      </FlexibleDiv>
    </PGWrapper>
  );
}
