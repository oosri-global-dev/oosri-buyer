import { FlexibleDiv } from "@/components/lib/Box/styles";
import { SDWrapper, CardWrapper } from "./smartphoneDeals.styles";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import ProductCard from "@/components/lib/ProductCard/productCard";

export default function SmartphoneDeals() {
  return (
    <SDWrapper>
      <FlexibleDiv justifyContent="space-between" alignItems="center">
        <h2>SmartPhone Deals</h2>
        <p className="view__all__style">View All</p>
      </FlexibleDiv>
      {smartphoneDealsData.map((card, idx) => (
        <ProductCard card={card} key={idx} />
      ))}
    </SDWrapper>
  );
}
