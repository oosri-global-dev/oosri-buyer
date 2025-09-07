import EmptyState from "@/components/lib/EmptyState/EmptyState";
import { WishListWrapper } from "./WishlistScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useState } from "react";
import TextField from "@/components/lib/TextField";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { smartphoneDealsData } from "@/data-helpers/homepage-helper";
import ProductCard from "@/components/lib/ProductCard/productCard";

export default function WishlistPage() {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <WishListWrapper flexDir={"column"} alignItems={"start"}>
      <FlexibleDiv className="top_bar" justifyContent={"space-between"}>
        <h1>Saved Items</h1>
        {!isEmpty && (
          <TextField
            border="border: 1.5px solid rgba(224, 224, 224, 0.60)"
            style={{
              boxShadow:
                "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset",
            }}
            prefix={<SearchIcon size={22} />}
            placeholder="Search by product , store name"
            className="search__textbox"
          />
        )}
      </FlexibleDiv>
      <div className="content_wrap">
        {isEmpty ? (
          <EmptyState
            title={"You haven’t saved an item yet!"}
            paragraph={
              "Spotted something appealing? Simply tap the heart-shaped icon beside the item to save it to your wishlist! All your cherished items will be displayed here."
            }
          />
        ) : (
          <FlexibleDiv
            width="100%"
            justifyContent="space-between"
            margin="30px 0 0 0"
          >
            {smartphoneDealsData.map((sgn, idx) => (
              <ProductCard card={sgn} key={idx} />
            ))}
          </FlexibleDiv>
        )}
      </div>
    </WishListWrapper>
  );
}
